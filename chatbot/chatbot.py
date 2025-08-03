import ollama
import smtplib
from email.mime.text import MIMEText

def check_for_crisis(user_message):
    # Basic crisis keywords list - expand as needed
    crisis_keywords = [
        "suicide", "kill myself", "end my life", "hopeless", "no way out",
        "want to die", "self-harm", "can't go on", "kill me", "thoughts of death",
        "overwhelmed", "give up", "feel trapped"
    ]
    msg = user_message.lower()
    return any(keyword in msg for keyword in crisis_keywords)

def crisis_response():
    # Predefined crisis resource message
    return (
        "I'm really sorry to hear that you're struggling. "
        "You are not alone, and there are people who want to help you. "
        "Please consider reaching out to a trusted friend, family member, or a mental health professional immediately. "
        "If you are in immediate danger, please call your local emergency number or a crisis hotline such as:\n"
        "- National Emergency Helpline Number: 112 (INDIA)\n"
        "- National Suicide Prevention Helpline Number: 1800-121-3667 (INDIA)\n"
        "Your safety is the most important thing right now."
    )

def send_crisis_notification(user_message, username, contact_info):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    sender_email = 'vanshgaming173@gmail.com'
    sender_password = 'koti xnpx srap rlwu'

    receiver_email = 'dhanushkarguin10@gmail.com'

    subject = 'CRISIS ALERT - User message flagged'
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
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("Crisis notification sent successfully.")
    except Exception as e:
        print("Failed to send crisis notification:", e)

user_input = "I feel very hopeless right now."
username = "Abdul_Rehman_Burhan"
contact_info = "adobeanimate2025@outlook.com"

if check_for_crisis(user_input):
    send_crisis_notification(user_input, username, contact_info)
    response_text = crisis_response()
else:
    # Normal chat flow
    response = ollama.chat(
        model='llama3:8b',
        messages=[{'role': 'user', 'content': user_input}]
    )
    response_text = response['message']['content']

print(response_text)