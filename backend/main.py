from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.orgs_db import orgs_db
from db.orgs_details import org_details
from models.orgs_details_model import OrgDetails

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
)

@app.get("/orgs")
def get_orgs():
    return orgs_db


@app.get("/orgs/details", response_model=list[OrgDetails])
def get_orgs_details():
    return org_details


@app.get("/orgs/{org_id}/credits",response_model=list[OrgDetails])
def get_org_credits(org_id: int):
    for org in org_details:
        if org.id == org_id:
            return [org]
    
