cd frontend on one terminal then npm run dev\
cd backend on another terminal then uvicorn main:app --reload --port 8080\
set the ip at client = ollama.Client(host="http://x.x.x.x:11434") in main.py to a machine where ollama is running\
and run ollama serve\