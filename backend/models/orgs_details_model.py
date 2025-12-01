from pydantic import BaseModel , HttpUrl

class OrgDetails(BaseModel):
    id: int
    name: str
    credits: int
    website: HttpUrl
    industry: str
    headquarters: str
    description: str
