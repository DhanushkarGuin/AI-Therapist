import requests
import datetime

# --- Fetch Token --- #
def get_access_token(client_id, client_secret, account_id):
    url = "https://zoom.us/oauth/token"
    payload = {
        "grant_type": "account_credentials",
        "account_id": account_id
    }

    response = requests.post(url, data=payload, auth=(client_id, client_secret))

    if response.status_code == 200:
        token_data = response.json()
        access_token = token_data["access_token"]
        expires_in = token_data["expires_in"]
        print(f"✅ Got Zoom Access Token (expires in {expires_in//60} minutes) at {datetime.now()}")
        return access_token
    else:
        print("❌ Failed to get token:", response.text)
        return None