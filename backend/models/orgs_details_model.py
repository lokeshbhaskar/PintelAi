from pydantic import BaseModel 
from typing import List,Dict

class OrgDetails(BaseModel):
    id: int
    name: str
    credits: int = 0
    allotments: list[dict] = []

