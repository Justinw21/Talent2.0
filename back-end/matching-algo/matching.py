import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import random
from faker import Faker
import matplotlib.pyplot as plt
import networkx as nx
from db_maker import generate_person_data

# Function to preprocess data into strings for vectorization
def preprocess_data(person):
    return (
        person['hobbies'] + ' ' +
        ' '.join(person['previous_work']) + ' ' +
        ' '.join(person['cities-lived-in']) + ' ' +
        str(person['fast-pace-preference']) + ' ' +
        str(person['team-size-preference']) + ' ' +
        str(person['independent'])
    )

def match_people(df : pd.DataFrame):
    interviewees = df[df['interviewee'] == True].reset_index(drop=True)
    interviewers = df[df['interviewee'] == False].reset_index(drop=True)

    # Vectorize data
    vectorizer = TfidfVectorizer()

    # Create a combined data set for vectorization
    combined_data = pd.concat([interviewees, interviewers])
    combined_data['text'] = combined_data.apply(preprocess_data, axis=1)
    tfidf_matrix = vectorizer.fit_transform(combined_data['text'])

    # Split the matrix for interviewees and interviewers
    interviewee_vectors = tfidf_matrix[:len(interviewees)]
    interviewer_vectors = tfidf_matrix[len(interviewees):]

    # Compute cosine similarity between interviewees and interviewers
    similarity_matrix = cosine_similarity(interviewee_vectors, interviewer_vectors)

    # Find the best matches for each interviewee
    pairings = []
    for i, interviewee in enumerate(interviewees['name']):
        # Find the best match interviewer index
        best_match_index = similarity_matrix[i].argmax()
        best_match_score = similarity_matrix[i][best_match_index]
        interviewer_name = interviewers.iloc[best_match_index]['name']
        
        pairings.append({
            "interviewee": interviewee,
            "interviewer": interviewer_name,
            "similarity_score": best_match_score
        })
    return pairings


# Step 1: Visualize pairings with a scatter plot
def plot_similarity_scores(pairings):
    interviewees = [pair['interviewee'] for pair in pairings]
    similarity_scores = [pair['similarity_score'] for pair in pairings]
    
    plt.figure(figsize=(10, 6))
    plt.scatter(interviewees, similarity_scores, color='blue')
    plt.xlabel('Interviewees')
    plt.ylabel('Similarity Score')
    plt.title('Similarity Scores for Interviewee-Interviewer Pairings')
    plt.xticks(rotation=45, ha='right')
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Step 2: Visualize pairings as a network graph
def plot_pairing_network(pairings, similarity_matrix, interviewees, interviewers):
    G = nx.Graph()
    
    # Add nodes for interviewees and interviewers
    for i, interviewee in enumerate(interviewees):
        G.add_node(interviewee, type='interviewee')
        
    for j, interviewer in enumerate(interviewers):
        G.add_node(interviewer, type='interviewer')
    
    # Add edges based on similarity scores
    for i, interviewee in enumerate(interviewees):
        for j, interviewer in enumerate(interviewers):
            G.add_edge(interviewee, interviewer, weight=similarity_matrix[i, j])
    
    # Draw the network
    pos = nx.spring_layout(G, seed=42)
    edge_weights = [d['weight'] for (u, v, d) in G.edges(data=True)]
    
    plt.figure(figsize=(12, 8))
    nx.draw_networkx(G, pos, with_labels=True, node_color='lightblue', edge_color=edge_weights,
                     edge_cmap=plt.cm.Blues, edge_vmin=0, edge_vmax=1, node_size=2000, font_size=10)
    sm = plt.cm.ScalarMappable(cmap=plt.cm.Blues, norm=plt.Normalize(vmin=0, vmax=1))
    sm.set_array([])
    plt.colorbar(sm, label='Similarity Score')
    plt.title('Network of Interviewee-Interviewer Pairings')
    plt.show()

# Run visualizations
# plot_similarity_scores(pairings)
# plot_pairing_network(pairings, similarity_matrix, interviewees['name'].tolist(), interviewers['name'].tolist())


if __name__ == "__main__":
    # Generate data
    num_records = 200  # Adjust as needed
    data = generate_person_data(num_records)

    # Convert the data into a DataFrame
    df = pd.DataFrame(data)

    pairings = match_people(df)

    # Print pairings
    print(pairings)