from pydantic import BaseModel 
from typing import Optional 
from datetime import datetime 

class UserIn(BaseModel):
    username: str 
    email: str 
    password: str

class UserOut(BaseModel):
    id: int
    username: str 
    email: str 
    created_at: datetime 

