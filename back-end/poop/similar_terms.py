from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd

# Sample list of hobbies or terms
terms = ["gaming", "video games", "hiking", "cycling", "biking", "running"]

# Vectorize the terms using TF-IDF
vectorizer = TfidfVectorizer().fit_transform(terms)
vectors = vectorizer.toarray()

# Compute cosine similarity matrix
cosine_sim_matrix = cosine_similarity(vectors)

# Display the similarity matrix in a DataFrame for easy viewing
df_sim = pd.DataFrame(cosine_sim_matrix, index=terms, columns=terms)

# Print the similarity matrix
print("Cosine Similarity Matrix:")
print(df_sim)

# Set a threshold to consider terms as similar
threshold = 0.5  # Adjust this based on your needs

# Group similar terms based on the threshold
similar_groups = {}
for i, term in enumerate(terms):
    similar_terms = [terms[j] for j in range(len(terms)) if cosine_sim_matrix[i][j] > threshold and i != j]
    if similar_terms:
        similar_groups[term] = similar_terms

# Display grouped terms
print("\nGrouped Similar Terms:")
for term, group in similar_groups.items():
    print(f"{term}: {group}")
