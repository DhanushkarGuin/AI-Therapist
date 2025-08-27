# --- Libraries and imports --- #
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] =  '3'

import sys
from dotenv import load_dotenv
from transformers import pipeline
from collections import deque, defaultdict
import matplotlib.pyplot as plt
from huggingface_hub import login

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHATBOT_FOLDER = os.path.join(PROJECT_ROOT, 'chatbot')

sys.path.append(CHATBOT_FOLDER)
import app

# --- Running other file for passing data --- #
app.run_chatbot()
user_prompts = app.user_prompts

# --- Loading Pipeline --- #
load_dotenv('.env.dashboard')
access_token = os.getenv('API_KEY')
login(access_token)

sentiment_analysis = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", framework='pt')

# --- Class for mood tracking --- #
class MoodTracker:
    def __init__(self, max_size=100, moods=None):
        self.max_size = max_size
        self.mood_queue = deque()
        self.mood_counts = defaultdict(int)

        if moods is None:
            moods = ['anger', 'disgust', 'fear', 'joy', 'neutral', 'sadness', 'surprise']
        for mood in moods:
            self.mood_counts[mood] = 0

    def track_mood(self, new_mood: str):
        self.mood_queue.append(new_mood)
        self.mood_counts[new_mood] += 1

        if len(self.mood_queue) > self.max_size:
            oldest = self.mood_queue.popleft()
            self.mood_counts[oldest] -= 1
            if self.mood_counts[oldest] < 0:
                self.mood_counts[oldest] = 0

    def get_mood_counts(self):
        return dict(self.mood_counts)

    def total_tracked(self):
        return len(self.mood_queue)

def plot_mood_counts(mood_counts):
    moods = list(mood_counts.keys())
    counts = list(mood_counts.values())

    plt.figure(figsize=(10,6))
    bars = plt.bar(moods, counts, color='skyblue')

    plt.title("Mood Counts in the Last 100 Messages")
    plt.xlabel("Mood")
    plt.ylabel("Count")
    plt.ylim(0, max(counts) + 5 if counts else 5)

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, yval + 0.5, int(yval), ha='center', va='bottom')

    plt.show()

tracker = MoodTracker(max_size=100)
for prompt in user_prompts:
        result = sentiment_analysis(prompt)[0]
        detected_mood = result['label']
        tracker.track_mood(detected_mood)

current_counts = tracker.get_mood_counts()
plot_mood_counts(current_counts)