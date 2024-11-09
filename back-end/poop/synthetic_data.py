import json
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Function to generate synthetic data
def generate_person_data(num_records=5):
    data = []
    for _ in range(num_records):
        person = {
            "name": fake.name(),
            "hobbies": ', '.join(fake.words(nb=2, unique=True)),
            "previous_work": [fake.job() for _ in range(random.randint(1, 3))],
            "fast-pace-preference": random.choice([True, False]),
            "team-size-preference": random.randint(1, 15),
            "independent": random.choice([True, False]),
            "cities-lived-in": [fake.city() for _ in range(random.randint(1, 3))]
        }
        data.append(person)
    return data

# Generate synthetic data
synthetic_data = generate_person_data(num_records=10)

# Print data as JSON
print(json.dumps(synthetic_data, indent=4))
