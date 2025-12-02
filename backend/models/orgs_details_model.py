from pydantic import BaseModel 

class OrgDetails(BaseModel):
    id: int
    name: str
    credits: int = 0
    allotments: list[dict] = []
