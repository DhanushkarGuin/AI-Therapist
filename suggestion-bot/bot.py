# suggestion-bot/bot.py
import sys
import json
import joblib
import numpy as np
import warnings
import os

warnings.filterwarnings('ignore')

model_path = os.path.join(os.path.dirname(__file__), 'new_model.pkl')
model = joblib.load(model_path)

def get_suggestion(data):
    try:
        # Map type_concern 0–4 down to 0–2 for model compatibility
        type_concern = min(2, data["type_concern"] // 2)

        user_data = np.array([[  
            data["current_emotion"],
            data["duration_distress"],
            type_concern,
            data["urgency_level"],
            data["support_style"],
            data["openness_to_technology"],
            data["time_availability"],
            data["issue_clarity"]
        ]])

        prediction = model.predict(user_data)[0]

        if prediction == 2:
            return "We suggest you to try our AI experience."
        elif prediction == 1:
            return "We suggest you to have a consult with human therapists and use our AI experience as well."
        else:
            return "We suggest you to consult human therapists."

    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    for line in sys.stdin:
        try:
            data = json.loads(line.strip())
            response = get_suggestion(data)
            print(json.dumps({"response": response}))
            sys.stdout.flush()
        except Exception as e:
            print(json.dumps({"error": str(e)}))
            sys.stdout.flush()