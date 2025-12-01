from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.orgs_db import orgs_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
)

@app.get("/orgs")
def get_orgs():
    return orgs_db
