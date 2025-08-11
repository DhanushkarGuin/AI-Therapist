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
detected_mood = result['label']

moods_detected = []

moods_detected.append(detected_mood)

from collections import deque, defaultdict
import matplotlib.pyplot as plt

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

tracker = MoodTracker(max_size=100)

for mood in moods_detected:
    tracker.track_mood(mood)

def plot_mood_counts(mood_counts):
    moods = list(mood_counts.keys())
    counts = list(mood_counts.values())

    plt.figure(figsize=(10,6))
    bars = plt.bar(moods, counts, color='skyblue')

    plt.title("Mood Counts in the Last 100 Messages")
    plt.xlabel("Mood")
    plt.ylabel("Count")
    plt.ylim(0, max(counts) + 5)

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, yval + 0.5, int(yval), ha='center', va='bottom')

    plt.show()

current_counts = tracker.get_mood_counts()
plot_mood_counts(current_counts)