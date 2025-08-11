import ollama
from crisis_control import check_for_crisis, crisis_response, send_crisis_notification
from avatars import avatars

conversation_history = []
user_input = None
response_text = None

def run_chatbot():
    ## User Input
    global user_input, response_text
    user_input = "I went to an interview today, interviewer told me I lack vision and I am not fit for the job. I feel like giving up on my career."
    username = "Dhanu-jodd"
    contact_info = "adobeanimate2025@outlook.com"

    ## Avatar Selection
    avatar_name = "Academic/Career Stress"
    system_prompt = avatars[avatar_name]["prompt"]

    if not conversation_history:
        conversation_history.append({'role': 'system', 'content': system_prompt})

    if check_for_crisis(user_input):
        send_crisis_notification(user_input, username, contact_info)
        response_text = crisis_response()
        conversation_history.append({'role': 'user', 'content': user_input})
        conversation_history.append({'role': 'assistant', 'content': response_text})
    else:
        try:
            conversation_history.append({'role': 'user', 'content': user_input})

            MAX_MEMORY = 7
            if len(conversation_history) > MAX_MEMORY + 1:
                conversation_history[:] = [conversation_history[0]] + conversation_history[-MAX_MEMORY:]

            response = ollama.chat(
                model='llama3:8b',
                messages=conversation_history
            )
            response_text = response['message']['content']
            conversation_history.append({'role': 'assistant', 'content': response_text})
        except Exception as e:
            response_text = f"Error during chatbot response: {str(e)}"

    return response_text

if __name__ == "__main__":
    reply = run_chatbot()
    print(reply)