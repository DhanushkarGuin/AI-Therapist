from zoom_tokens import response
import requests

def create_zoom_meeting(user_id="me"):
    url = f"https://api.zoom.us/v2/users/{user_id}/meetings"
    headers = {"Authorization": f"Bearer {response['access_token']}"}
    payload = {
        "topic": "Therapy Session",
        "type": 1,  # instant meeting
        "settings": {"auto_recording": "cloud"}
    }
    r = requests.post(url, headers=headers, json=payload)
    r = r.json()
    meeting_id = r.get('id')
    start_url = r.get('start_url')
    join_url = r.get('join_url')
    return meeting_id, start_url, join_url