from pydantic import BaseModel

class CreditRequest(BaseModel):
    credits: int