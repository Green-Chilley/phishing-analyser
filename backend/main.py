from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import eml_parser
import ollama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ep = eml_parser.EmlParser(include_raw_body=True, include_attachment_data=True)

def parse_email(eml_bytes: bytes):
    return ep.decode_email_bytes(eml_bytes)

@app.post("/analyse")
async def analyse_email(file: UploadFile = File(...)):
    raw_bytes = await file.read()
    parsed = parse_email(raw_bytes)
    
    subject = parsed.get('header', {}).get('subject', '')
    body = parsed.get('body', [{}])[0].get('content', '')
    
    client = ollama.Client(host="http://192.168.1.60:11434")
    
    response = client.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": f"Analyse this email for phishing indicators:\nSubject: {subject}\nBody: {body}"
            }
        ]
    )

    analysis = response["message"]["content"]
    
    return JSONResponse(content=json.loads(json.dumps({**parsed, "analysis": analysis}, default=str)))