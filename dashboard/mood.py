import os
import sys
from dotenv import load_dotenv
from transformers import pipeline

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHATBOT_FOLDER = os.path.join(PROJECT_ROOT, 'chatbot')

sys.path.append(CHATBOT_FOLDER)
import app

app.run_chatbot()
user_input = app.user_input

load_dotenv('.env.dashboard')
access_token = os.getenv('API_KEY')

sentiment_analysis = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", token=access_token)

result = sentiment_analysis(user_input)[0]
print(result)