import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# --- Loading Env files --- #
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env.email"))

# --- Email Sending --- #
def send_email(recipient_email, text):
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SMTP_EMAIL = os.getenv("SENDER_EMAIL")
    SMTP_PASSWORD = os.getenv("SENDER_PASSWORD")

    msg = MIMEText(text, 'plain')
    msg['Subject'] = "Your session's transcription"
    msg['From'] = SMTP_EMAIL
    msg['To'] = recipient_email

    try:
        with smtplib.SMTP(SMTP_SERVER,SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
        print(f'Email sent successfully to {recipient_email}!')
    except Exception as e:
        print(f'Email failed to sent: {e}')