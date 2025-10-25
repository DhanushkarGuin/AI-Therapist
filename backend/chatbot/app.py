import sys
import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification
from avatars import avatars

def run_chatbot():
    username = "Dhanu-jodd"
    contact_info = "adobeanimate2025@outlook.com"
    avatar_name = "Academic/Career Stress"
    system_prompt = avatars[avatar_name]["prompt"]

    conversation_history = [{"role": "system", "content": system_prompt}]

    # Tell Node it's ready
    print("READY", flush=True)

    while True:
        user_input = sys.stdin.readline().strip()
        if not user_input:
            continue

        if user_input.lower() in ['exit', 'quit']:
            print("Goodbye!", flush=True)
            break

        conversation_history.append({"role": "user", "content": user_input})

        try:
            if check_for_crisis(user_input):
                send_crisis_notification(user_input, username, contact_info)
                print(f"NOTIFY: Crsis detected for user {username} - notification sent.", flush= True);
                response_text = crisis_response()
            else:
                response = ollama.chat(
                    model='llama3:8b',
                    messages=conversation_history
                )
                response_text = response['message']['content']

            conversation_history.append({"role": "assistant", "content": response_text})
            print(response_text, flush=True)

        except Exception as e:
            print(f"Error: {e}", flush=True)

if __name__ == "__main__":
    run_chatbot()
