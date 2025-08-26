import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification
from avatars import avatars

conversation_history = []
user_input = None
response_text = None

def run_chatbot():
    ## User Input
    global user_input, response_text
    username = "Dhanu-jodd"
    contact_info = "adobeanimate2025@outlook.com"

    ## Avatar Selection
    avatar_name = "Academic/Career Stress"
    system_prompt = avatars[avatar_name]["prompt"]

    ## Past Context Feature": conversation history
    conversation_history = [
        {"role":"system", "content": system_prompt}
    ]

    ## Chat loop
    print("Chatbot is ready! Type 'exit' to quit.\n")

    while True:
        user_input = input("You:").strip()
        if user_input.lower() in ['exit','quit']:
            print('Chatbot: Goodbye')
            break

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