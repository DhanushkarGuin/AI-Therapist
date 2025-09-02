import requests

# --- Fetch Files --- #
def fetch_zoom_recording(meeting_id, access_token):
    url = f"https://api.zoom.us/v2/meetings/{meeting_id}/recordings"
    headers = {"Authorization": f"Bearer {access_token}"}
    r = requests.get(url, headers=headers)
    data = r.json()
    print("📥 Zoom recording metadata:", data)

    if "recording_files" in data:
        file_url = data["recording_files"][0]["download_url"]
        file_url += f"?access_token={access_token}"
        local_file = "zoom_recording.mp4"
        with requests.get(file_url, stream=True) as f:
            with open(local_file, "wb") as out:
                for chunk in f.iter_content(1024):
                    out.write(chunk)
        return local_file
    return None