from flask import Flask, request
import fasttext
import pickle
import numpy as np

app = Flask(__name__)

params = ['cohesion', 'conventions', 'grammar', 'phraseology', 'syntax', 'vocabulary']
fasttxt = fasttext.load_model('../models/fasttext_embeddings.bin')

import re

from nltk import WordNetLemmatizer, word_tokenize
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords


def remove_punctuation(text):
    text = re.sub(r"[^\w]", " ", text)
    text = re.sub(r"\s+", " ", text.strip())
    return text

def remove_stop_words(text):
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)

    filtered_tokens = [token.lower() for token in tokens if token not in stop_words]

    return " ".join(filtered_tokens)

def lemmatize_sentence(text):
    tokens = word_tokenize(text)
    lemmatizer = WordNetLemmatizer()
    text = " ".join([lemmatizer.lemmatize(token) for token in tokens])

    return text



def load_models():
    models = []

    for param in params:
        with open(f'../models/model_{param}', 'rb') as f:
            model = pickle.load(f)
            models.append(model)

    return models

models = load_models()


@app.route('/getgrades', methods=['POST'])
def get_grades():
    file = request.files['files[]']

    filepath = ''

    if file:
        filename = file.filename
        filepath = f'./uploaded/{filename}'
        file.save(filepath)


    if filepath:
        with open(filepath, 'r') as f:
            lines =  f.readlines()

    print(lines)

    lines = ' '.join(lines)
    lines = remove_punctuation(remove_stop_words(lines))

    lemm_lines = lemmatize_sentence(lines)
    

    sentence_vec = fasttxt.get_sentence_vector(lemm_lines)
    sentence_vec = np.reshape(sentence_vec, (1, 100))

    scores = {}

    for param, model in zip(params, models):
        scores[param] = round(model.predict(sentence_vec)[0]*2, 2)

    print(scores)

    return scores
    




