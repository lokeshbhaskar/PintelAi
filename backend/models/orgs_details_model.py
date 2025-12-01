from pydantic import BaseModel , HttpUrl

class OrgDetails(BaseModel):
    id: int
    name: str
    website: HttpUrl
    industry: str
    headquarters: str
    description: str