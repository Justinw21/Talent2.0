from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import db.db as db

# Define a Pydantic model for inserting data into the table
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

@app.get("/")
def root():
    return {"Hello", "World"}

# Route to add a new user to the database
@app.post("/add_user/")
def add_user(user: User):
    db.insert_user(user)  # Call the function from db.py to insert user
    return {"message": "User added successfully"}

# Route to retrieve a user by email
@app.get("/get_user/{email}")
def get_user(email: str):
    user_data = db.get_user_by_email(email)  # Call the function from db.py to get user
    return user_data