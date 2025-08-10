import os
import sys
from dotenv import load_dotenv
from transformers import AutoModelForSequenceClassification, AutoTokenizer

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHATBOT_FOLDER = os.path.join(PROJECT_ROOT, 'chatbot')

sys.path.append(CHATBOT_FOLDER)
import app

app.run_chatbot()
user_input = app.user_input

load_dotenv('.env.dashboard')
access_token = os.getenv('API_KEY')

model = AutoModelForSequenceClassification.from_pretrained("boltuix/bert-emotion", token=access_token)
tokenizer = AutoTokenizer.from_pretrained("boltuix/bert-emotion", token=access_token)

print(user_input)