from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.orgs_db import orgs_db
from db.orgs_details import org_details
from models.orgs_details_model import OrgDetails
from models.credit_request import CreditRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
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


 

@app.post("/org/{org_id}/credits")
def add_org_credits(org_id: int, body:CreditRequest):
    for org in org_details:
        if org.id == org_id:
            org.credits += body.credits
        return {
            "message": f"Successfully added {body.credits} credits",
            "org_id": org_id,
            "new_credits": org.credits
        }   
    raise HTTPException(status_code=404, detail="Organization not found")

