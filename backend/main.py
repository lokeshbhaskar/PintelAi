from fastapi import HTTPException
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.orgs_db import orgs_db
from db.orgs_details import org_details
from models.orgs_details_model import OrgDetails
from models.credit_request import CreditRequest
from db.pending_allotments import pending_allotments

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


@app.get("/orgs/{org_id}/credits",response_model=OrgDetails)
def get_org_credits(org_id: int):
    for org in org_details:
        if org.id == org_id:
            return org
        

# request api
@app.post("/org/{org_id}/credits/requests")
def request_credit(org_id: int,body:CreditRequest):
    for org in org_details:
        if org.id == org_id:
            new_request = {
                "org_id": org_id,
                 "credits": body.credits
            }
            pending_allotments.append(new_request)

            return {
                "message":"Credit request created. Pending Approval",
                "request":new_request
            }
        
    raise HTTPException(status_code=404, detail="Organization not found")


@app.get("/credits/pending")
def get_pending_requests():
    return pending_allotments


# approve request
@app.post("/org/{org_id}/credits/approve")
def approve_credit(org_id: int):
    for req in pending_allotments:
        if req["org_id"] == org_id:
            
            for org in org_details:
                if org.id == org_id:
                    org.allotments.append({"credits": req["credits"]})
                    pending_allotments.remove(req)

                    return {
                        "message": "Credit request approved successfully",
                        "org_id": org_id,
                        "allotments": org.allotments
                    }
                
    raise HTTPException(status_code=404, detail="No pending request found for this organization")


# reject request
@app.post("/org/{org_id}/credits/reject")
def reject_credit(org_id: int):
    for req in pending_allotments:
        if req["org_id"] == org_id:
            pending_allotments.remove(req)
            return {
                "message": "Credit request rejected successfully",
                "org_id": org_id
            }

    raise HTTPException(status_code=404, detail="No pending request found for this organization")

