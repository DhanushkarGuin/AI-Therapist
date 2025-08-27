# --- Libraries and imports --- #
import sounddevice as sd
import queue
import json
from vosk import Model, KaldiRecognizer
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env.transcription"))

# --- Model Configure --- #
model_path = os.path.abspath("note-taking/vosk_model/vosk-model-small-en-us-0.15")
model = Model(model_path)
recognizer = KaldiRecognizer(model, 16000)
q = queue.Queue()

all_final_sections = []

def audio_callback(indata, frames, time, status):
    if status:
        print(status, flush=True)
    q.put(bytes(indata))

recipient_email = None

def transcribe_section():
    global recipient_email
    recipient_email = input("Enter recipient email:").strip()

    try:
        with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype='int16',
                                channels=1, callback=audio_callback):
            print("🎤 Listening... Press Ctrl+C to end this section.")
            while True:
                data = q.get()
                if recognizer.AcceptWaveform(data):
                    result = json.loads(recognizer.Result())
                    print(f"\nFinal: {result.get('text', '')}")
                else:
                    partial = json.loads(recognizer.PartialResult())
                    print(f"Partial: {partial.get('partial', '')}", end='\r')
    except KeyboardInterrupt:
        final_result = json.loads(recognizer.FinalResult())
        if final_result.get('text', '').strip():
            section_text = final_result['text']
            all_final_sections.append(section_text)
            print(f"\nFinal section text: {section_text}")
        print("\nSection ended.\n")

def send_email(recipient_email, transcript_text):
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = os.getenv('SENDER_EMAIL')
    SENDER_PASSWORD = os.getenv('EMAIL_APP_PASSWORD')

    subject = "Your Meeting Transcripts"
    msg = MIMEText(transcript_text, "plain")
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg["To"] = recipient_email

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        print(f"Email sent successfully to {recipient_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")


if __name__ == "__main__":
    while True:
        transcribe_section()
        choice = input("Press Enter to start next section or type 'exit' to quit: ").strip().lower()
        if choice == "exit":
            print("Transcription session ended by therapist.")
            if all_final_sections:
                combined_text = "\n\n--- New Section ---\n\n".join(all_final_sections)
                send_email(recipient_email, combined_text)
            else:
                print("No transcripts to send.")
            break