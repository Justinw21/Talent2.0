import sqlite3
from fastapi import HTTPException

DB_FILE = "SITE.db"
db = sqlite3.connect(DB_FILE, check_same_thread = False)
c = db.cursor()

# Creating table
c.execute("CREATE TABLE if not Exists info(email TEXT primary key, name TEXT, hobbies TEXT, places TEXT, companies TEXT, pace INTEGER, independent INTEGER, size INTEGER)")
c.execute("CREATE TABLE if not Exists recruiter(email TEXT primary key, password TEXT)")
c.execute("CREATE TABLE if not Exists listings(id INT primary key, application TEXT, job_desc TEXT, date_posted TEXT, dept TEXT, status TEXT)")

# Utility function to connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row  # This allows dictionary-like row access
    return conn

# Function to insert a user into the database
def insert_user(user):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO info (email, name, hobbies, places, companies, pace, independent, size)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (user.email, user.name, user.hobbies, user.places, user.companies, user.pace, user.independent, user.size))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already exists")
    conn.close()

# Function to retrieve a user by email from the database
def get_user_by_email(email: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM info WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()
    if row is None:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row) 

db.commit()