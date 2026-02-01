from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import time
import jwt

# Mock Database
USERS_DB = {
    "maestro": {"role": "KUKULKAN", "permissions": ["ROOT", "AUDIT", "WAR_ROOM"]},
    "abogado_jr": {"role": "ASSOCIATE", "permissions": ["READ_CASE", "UPLOAD_DOC"]},
    "jules_agent": {"role": "AI_AGENT", "permissions": ["READ_CODE", "WRITE_ANALYSIS"]}
}

router = APIRouter()

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Profile(BaseModel):
    username: str
    role: str
    permissions: List[str]

SECRET_KEY = "NEO_IURIS_SUPREMACY_KEY"

@router.post("/auth/login", response_model=Token)
def login(user: UserLogin):
    if user.username in USERS_DB and user.password == "admin123": # Mock Pass
        payload = {
            "sub": user.username,
            "role": USERS_DB[user.username]["role"],
            "exp": time.time() + 3600
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/auth/me", response_model=Profile)
def read_users_me(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_data = USERS_DB.get(payload["sub"])
        return {"username": payload["sub"], "role": user_data["role"], "permissions": user_data["permissions"]}
    except:
        raise HTTPException(status_code=403, detail="Invalid Token")
