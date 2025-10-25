from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from pathlib import Path

def check_for_crisis(user_message: str) -> bool:
    crisis_keywords = [
        "suicide", "kill myself", "end my life", "hopeless", "no way out",
        "want to die", "self-harm", "can't go on", "kill me", "thoughts of death",
        "give up", "feel trapped", "go on anymore", "i wish i were dead", "there's no way out", "life is pointless",
        "no one can help me", "i'm a burden", "i'd be better off dead", "nothing will ever change", "i have no purpose",
        "everyone would be better off without me", "i can't stop these thoughts"
    ]
    msg = user_message.lower()
    return any(keyword in msg for keyword in crisis_keywords)


def crisis_response() -> str:
    return (
        "I'm really sorry to hear that you're struggling. "
        "You are not alone, and there are people who want to help you. "
        "Please consider reaching out to a trusted friend, family member, or a mental health professional immediately. "
        "If you are in immediate danger, please call your local emergency number or a crisis hotline such as:\n"
        "- National Emergency Helpline Number: 112 (INDIA)\n"
        "- National Suicide Prevention Helpline Number: 1800-121-3667 (INDIA)\n"
        "Your safety is the most important thing right now."
    )

# Load environment
dotenv_path = Path(__file__).parent / ".env.chatbot"
load_dotenv(dotenv_path=dotenv_path)

print("Loaded .env.chatbot:", os.getenv('RECEIVER_EMAIL'), flush=True)

def send_crisis_notification(user_message: str, username: str, contact_info: str) -> None:
    sender_email = os.getenv('SENDER_EMAIL', )
    sender_password = os.getenv('EMAIL_APP_PASSWORD',)
    receiver_email = os.getenv('RECEIVER_EMAIL',)

    if not all([sender_email, sender_password, receiver_email]):
        print("Crisis notification skipped (missing email configuration).", flush=True)
        return

    subject = 'CRISIS ALERT - Urgent Attention Required'
    body = (
        f"Crisis detected in user message:\n\n{user_message}\n\n"
        f"User details:\n"
        f"Username: {username}\n"
        f"Contact Info: {contact_info}\n\n"
        "Please follow up with the user immediately."
    )

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
        print("Crisis notification email sent successfully.", flush=True)
    except Exception as e:
        print(f"Failed to send crisis notification: {e}", flush=True)
