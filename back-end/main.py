from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import matching_algo.matching as matching
from fastapi.middleware.cors import CORSMiddleware

person_data = []
with open('person_data.json') as f:
    person_data = json.load(f)
# print(person_data)
# Define a Pydantic model for inserting data into the table

origins = [
    "*", # Allow all origins
]


class User(BaseModel):
    email: str
    name: str
    hobbies: str
    places: str
    companies: str
    pace: int
    independent: int
    size: int

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"Hello", "World"}


@app.get("/get_users/")
def get_users_in_range(start: int, end: int):
    if start < 0 or end >= len(person_data) or start > end:
        raise HTTPException(status_code=400, detail="Invalid range")
    return person_data[start:end+1]

@app.post("/get_pairings/")
def get_pairings(users: list[dict]):
    # print(users)
    # users = json.loads(users)
    try:
        pairings = matching.generate_matches(users)
        return pairings
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

# # Route to add a new user to the database
# @app.post("/add_user/")
# def add_user(user: User):
#     db.insert_user(user)  # Call the function from db.py to insert user
#     return {"message": "User added success    fully"}

# # Route to retrieve a user by email
# @app.get("/get_user/{email}")
# def get_user(email: str):
#     user_data = db.get_user_by_email(email)  # Call the function from db.py to get user
#     return user_data

