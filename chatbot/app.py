# --- Libraries and imports --- #
import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification
from avatars import avatars

# --- Global Scope Constraints --- #
conversation_history = []
user_prompts = ["I am really sad", "I have been facing anxiety issues"]
user_input = None
response_text = None

# --- Main chatbot function --- #
def run_chatbot():
    # - User Details - # 
    global user_input, response_text, user_prompts
    username = "Dhanu-jodd"
    contact_info = "adobeanimate2025@outlook.com"

    # - Avatar Selection - #
    avatar_name = "Academic/Career Stress"
    system_prompt = avatars[avatar_name]["prompt"]

    # - Conversation History for past context - #
    conversation_history = [
        {"role":"system", "content": system_prompt}
    ]

    # - Chat loop - #
    print("Chatbot is ready! Type 'exit' to quit.\n")

    while True:
        user_input = input("You:").strip()
        if user_input.lower() in ['exit','quit']:
            print('Chatbot: Goodbye')
            break

        user_prompts.append(user_input)

        conversation_history.append({"role":"user","content":user_input})
        
        
        if check_for_crisis(user_input):
            send_crisis_notification(user_input, username, contact_info)
            response_text = crisis_response()
            conversation_history.append({"role": "assistant", "content": response_text})
        else:
            try:
                response = ollama.chat(
                    model='llama3:8b',
                    messages=conversation_history
                )
                response_text = response['message']['content']

                conversation_history.append({"role": "assistant", "content": response_text})
            except Exception as e:
                response_text = f"Error during chatbot response: {str(e)}"

        print(f"Chatbot: {response_text}\n")

if __name__ == "__main__":
    reply = run_chatbot()
    print(reply)