from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class Organization(BaseModel):
    id: int
    name: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
)

orgs_db: List[Organization] = [
     {"id": 1, "name": "Pintel Ai"},
     {"id": 2, "name": "Capgemini"},
     {"id": 3, "name": "Clay"}
]

@app.get("/orgs")
def orgs():
    return orgs_db