from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

client = MongoClient("mongodb://localhost:27017")
db = client["quicktask"]
tasks = db["tasks"]

@app.get("/stats/{user_id}")
def stats(user_id: str):
    total = tasks.count_documents({"userId": user_id})
    completed = tasks.count_documents({
        "userId": user_id,
        "status": "Completed"
    })

    return {
        "total_tasks": total,
        "completed_tasks": completed
    }
