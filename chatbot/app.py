import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification

def run_chatbot():
    ## Example User Input
    user_input = "I am feeling sad because I couldn't get the job I wanted.Should I consider suicide?"
    username = "Abdul_Rehman_Burhan"
    contact_info = "adobeanimate2025@outlook.com"

    if check_for_crisis(user_input):
        send_crisis_notification(user_input, username, contact_info)
        response_text = crisis_response()
    else:
        try:
            response = ollama.chat(
                model='llama3:8b',
                messages=[{'role': 'user', 'content': user_input}]
            )
            response_text = response['message']['content']
        except Exception as e:
            response_text = f"Error during chatbot response: {str(e)}"

    print(response_text)

if __name__ == "__main__":
    run_chatbot()