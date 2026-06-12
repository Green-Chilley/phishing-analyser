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

@app.post("/parse")
async def parse_email_endpoint(file: UploadFile = File(...)):
    raw_bytes = await file.read()
    parsed = parse_email(raw_bytes)
    return JSONResponse(content=json.loads(json.dumps(parsed, default=str)))

@app.post("/analyse")
async def analyse_email(file: UploadFile = File(...)):
    raw_bytes = await file.read()
    parsed = parse_email(raw_bytes)
    
    subject = parsed.get('header', {}).get('subject', '')
    body = parsed.get('body', [{}])[0].get('content', '')
    from_email = parsed.get('header', {}).get('from', '')
    reply_to = parsed.get('header', {}).get('reply-to', '')
    spf = parsed.get('header', {}).get('header', {}).get('received-spf', '')
    dkim = parsed.get('header', {}).get('header', {}).get('dkim-signature', '')
    dmarc = parsed.get('header', {}).get('header', {}).get('authentication-results', '')
    return_path = parsed.get('header', {}).get('header', {}).get('return-path', '')
    message_id = parsed.get('header', {}).get('header', {}).get('message-id', '')
    
    client = ollama.Client(host="http://192.168.1.60:11434")
    
    prompt = f"""You are a cautious phishing email analyst. Your job is to analyze emails accurately.
            You must NOT flag an email as phishing unless there is strong concrete evidence.
            Legitimate emails from real companies often use third party sending services like Mailgun, SendGrid, or Workable.

            Think step by step:
            1. Check authentication results first — SPF/DKIM/DMARC pass is a strong legitimacy signal
            2. Check if the sending domain is consistent across From, Return-Path, and Message-ID
            3. Check if the content makes sense in context
            4. Only flag as phishing if you find CONCRETE red flags

            AUTHENTICATION (most important):
            - SPF: {spf}
            - DKIM: {dkim}
            - DMARC: {dmarc}

            SENDER:
            - From: {from_email}
            - Reply-To: {reply_to or "not set"}
            - Return-Path: {return_path}
            - Message-ID: {message_id}

            CONTENT:
            - Subject: {subject}
            - Body: {body}

            SCORING GUIDE:
            0-2: All auth passes, domains consistent, legitimate content
            3-4: Minor anomalies but nothing concrete
            5-6: Some suspicious signals worth noting
            7-8: Multiple concrete red flags
            9-10: Clear phishing attempt

            Limit your analysis to 5 sentences and focus on the most relevant indicators.
            If there are no clear indicators, state that the email appears to be legitimate.
            Note that there may not be enough context to make a definitive judgement, so focus on the most likely indicators based on the provided data.
            """
    
    response = client.chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "system",
                "content": "You are a senior email security analyst with 10 years experience. You are precise and evidence based. You never flag an email as phishing without concrete proof. You know that SPF/DKIM/DMARC passing is a strong legitimacy signal."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
    )

    analysis = response["message"]["content"]
    return JSONResponse(content={"analysis": analysis})