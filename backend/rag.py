import chromadb
from sentence_transformers import SentenceTransformer
from phishing_examples import examples

client = chromadb.PersistentClient(path="./phishing.db")
collection = client.get_or_create_collection("phishing_emails")
model = SentenceTransformer("all-MiniLM-L6-v2")

if collection.count() == 0:
    for ex in examples:
        embedding = model.encode(ex["text"]).tolist()
        collection.add(
            ids=[ex["id"]],
            embeddings=[embedding],
            documents=[ex["text"]],
            metadatas=[{
                "verdict": ex["verdict"],
                "type": ex["type"],
                "brand": ex["brand"]
            }]
        )
    print(f"Seeded {len(examples)} examples into ChromaDB")

def get_similar_examples(email_text: str, n: int = 3) -> list[dict]:
    count = collection.count()
    if count == 0:
        return []
    
    embedding = model.encode(email_text).tolist()
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n
    )
    
    similar = []
    for i in range(len(results["ids"][0])):
        similar.append({
            "text": results["documents"][0][i],
            "verdict": results["metadatas"][0][i]["verdict"],
            "type": results["metadatas"][0][i]["type"],
            "distance": results["distances"][0][i] 
        })
        
    return similar

def build_prompt(email: dict) -> str:
    email_text = f"""
    From: {email['from_address']}
    Subject: {email['subject']}
    Body: {email['body']}
    """.strip()
    
    similar = get_similar_examples(email_text)
    
    if similar:
        context = "\n\n".join([
            f"Similar email ({ex['verdict'].upper()}):\n{ex['text']}"
            for ex in similar
        ])
        context_block = f"Here are similar emails from our database for reference:\n\n{context}\n\n---\n\n"
    else:
        context_block = ""
    
    return f"""
{context_block}Now analyse this new email:

{email_text}
"""