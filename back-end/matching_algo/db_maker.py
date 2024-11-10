import random
from faker import Faker
import json
# Initialize Faker
fake = Faker()

hobbies = [
    "Reading", "Writing", "Painting", "Drawing", "Sketching", "Photography", "Gardening",
    "Knitting", "Crocheting", "Sewing", "Baking", "Cooking", "Hiking", "Cycling", "Running",
    "Swimming", "Yoga", "Meditation", "Dancing", "Playing musical instruments", "Singing",
    "Acting", "Traveling", "Birdwatching", "Rock climbing", "Skateboarding", "Surfing",
    "Fishing", "Boating", "Sailing", "Woodworking", "Metalworking", "Pottery", "Sculpting",
    "Calligraphy", "Scrapbooking", "Puzzles", "Board games", "Card games", "Chess",
    "Video gaming", "Virtual reality gaming", "Robotics", "Coding", "Blogging", "Vlogging",
    "Podcasting", "DIY crafts", "Home decorating", "Antiquing", "Coin collecting",
    "Stamp collecting", "Thrifting", "Volunteering", "Animal care", "Soap making",
    "Candle making", "Jewelry making", "Makeup artistry", "Nail art", "Fashion design",
    "Interior design", "Astrology", "Tarot reading", "Magic tricks", "Learning languages",
    "Writing poetry", "Journaling", "History research", "Genealogy", "Astronomy",
    "Stargazing", "Watching documentaries", "Movie watching", "Theater-going", "Martial arts",
    "Self-defense training", "Weightlifting", "CrossFit", "Parkour", "Archery", "Paintball",
    "Laser tag", "Geocaching", "Metal detecting", "Camping", "Wildlife spotting",
    "Urban exploration", "Picnicking", "Car restoration", "Model building", "Bonsai growing",
    "Aquascaping", "Playing cards", "Sudoku", "Crossword puzzles", "Kite flying",
    "Model airplanes", "Origami", "Birdhouse building", "Beekeeping", "Wine tasting",
    "Home brewing", "Barbecuing", "Vegetable gardening", "Mushroom hunting", "Bonsai crafting",
    "Puzzle-solving", "Rock tumbling", "Beadwork", "Flower arranging", "Paragliding",
    "Skydiving", "Scuba diving", "Snorkeling", "Ice skating", "Skiing", "Snowboarding",
    "Curling", "Bowling", "Golf", "Tennis", "Table tennis", "Badminton", "Frisbee",
    "Ultimate frisbee", "Lacrosse", "Football", "Basketball", "Soccer", "Baseball",
    "Softball", "Cricket", "Rugby", "Kickboxing", "Fencing", "Judo", "Taekwondo", "Karate",
    "Powerlifting", "Rowing", "Canoeing", "Stand-up paddleboarding", "Snooker", "Billiards",
    "Pool", "Darts", "Whittling", "Soap carving"
]
def generate_person_data(num_records=5):
    data = []
    for _ in range(num_records):
        person = {
            "name": fake.name(),
            "hobbies": ', '.join(random.sample(hobbies, random.randint(1, 5))),
            "previous_work": [fake.job() for _ in range(random.randint(1, 3))],
            "fast-pace-preference": random.choice([True, False]),
            "team-size-preference": random.randint(1, 15),
            "independent": random.choice([True, False]),
            "cities-lived-in": [fake.city() for _ in range(random.randint(1, 3))],
            "interviewee": random.choice([True, True, True, True, True, True, True, False])
        }
        data.append(person)
    return data

if __name__ == "__main__":
    data = generate_person_data(num_records=400)
    with open('person_data.json', 'w') as f:
        json.dump(data, f, indent=4)