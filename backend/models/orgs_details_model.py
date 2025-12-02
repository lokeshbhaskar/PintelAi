from pydantic import BaseModel , HttpUrl

class OrgDetails(BaseModel):
    id: int
    name: str
    credits: int
