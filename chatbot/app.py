import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification
from avatars import avatars

conversation_history = []
user_input = None
response_text = None

def run_chatbot():
    ## User Input
    global user_input, response_text
    user_input = "Do you remember what I said earlier?"
    username = "Dhanu-jodd"
    contact_info = "adobeanimate2025@outlook.com"

    ## Avatar Selection
    avatar_name = "Academic/Career Stress"
    system_prompt = avatars[avatar_name]["prompt"]

    if check_for_crisis(user_input):
        send_crisis_notification(user_input, username, contact_info)
        response_text = crisis_response()
    else:
        try:
            response = ollama.chat(
                model='llama3:8b',
                messages=[
                    {'role':'system','content':system_prompt},
                    {'role':'user','content':user_input}
                ]
            )
            response_text = response['message']['content']
        except Exception as e:
            response_text = f"Error during chatbot response: {str(e)}"

    return response_text

if __name__ == "__main__":
    reply = run_chatbot()
    print(reply)