from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
import json
import eml_parser
import ollama
import re
from rag import build_prompt
from pydantic import BaseModel

# for demo, run ollama serve and uvicorn main:app --reload --host 0.0.0.0 --port 8080 on desktop

class EmailSchema(BaseModel):
    from_address: str
    reply_to: str | None = None
    subject: str
    body: str

# TODO: OPTIONAL: create manual scripts to assist AI in phishing detection, looking up legitimate domains, urls, sender etc
# TODO: Implement RAG

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://phishinganalyser.duckdns.org",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print("Validation error:", exc.errors())
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()}
    )
    
def strip_html(html: str) -> str:
    html = re.sub(r'<(style|script)[^>]*>.*?</\1>', '', html, flags=re.DOTALL)
    html = re.sub(r'<[^>]+>', ' ', html)
    html = re.sub(r'\s+', ' ', html).strip()
    return html[:2000]

ep = eml_parser.EmlParser(include_raw_body=True, include_attachment_data=True)

def parse_email(eml_bytes: bytes):
    return ep.decode_email_bytes(eml_bytes)

@app.post("/parse")
async def parse_email_endpoint(file: UploadFile = File(...)):
    raw_bytes = await file.read()
    parsed = parse_email(raw_bytes)
    print(str(parsed))
    return JSONResponse(content=json.loads(json.dumps(parsed, default=str)))

@app.post("/analyse")
async def analyse_email(email: EmailSchema):
    clean_body = strip_html(email.body)

    prompt = build_prompt({
        "from_address": email.from_address,
        "reply_to": email.reply_to,
        "subject": email.subject,
        "body": clean_body
    })  

    client = ollama.Client(host="http://192.168.1.70:11434")
    system = """
                    
                    You are a cybersecurity expert specialising in phishing email detection.
                    Analyse the provided email and identify indicators of phishing or malicious intent.

                    Evaluate the following:
                    - Sender legitimacy (domain mismatch, spoofing, suspicious From/Reply-To)
                    - Urgency or pressure tactics
                    - Suspicious links or attachments
                    - Grammar and spelling issues
                    - Requests for sensitive information
                    - Impersonation of trusted brands or people

                    Respond in the following JSON format only, no extra text:
                    {
                    "verdict": "phishing" | "suspicious" | "legitimate" | "graymail",
                    "confidence": "high" | "medium" | "low",
                    "reasons": ["reason 1", "reason 2"],
                    "risk_score": <integer 1-10>
                    }
                        """
    
    try:
        response = client.chat( 
            model="llama3.1:8b",
            messages=[
                {
                    "role": "system",
                    "content": system
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            options={
                "temperature": 0.1,
                "top_p": 0.9
            }
        )
        analysis = response.message.content
        return JSONResponse(content=json.loads(analysis))
    except ConnectionError:
        analysis = "LLM analysis unavailable — Ollama is not running."
    except json.JSONDecodeError:
        return JSONResponse(content={"error": "LLM returned invalid JSON", "raw": analysis}, status_code=500)