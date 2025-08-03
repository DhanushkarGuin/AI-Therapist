import ollama
import time

# Basic prompt/response
start_time = time.time()
response = ollama.chat(
    model='llama3:8b',
    messages=[{
        'role': 'user',
        'content': 'I feel very frustrated with my current job. What should I do?'
    }]
)
print(response['message']['content'])
end_time = time.time()
print(f"Response time: {end_time - start_time} seconds")