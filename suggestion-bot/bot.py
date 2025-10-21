import joblib 
import numpy as np
import warnings
warnings.filterwarnings('ignore')

model = joblib.load('new_model.pkl')

print('Enter the numbers based on options: \n')

current_emotion = int(input("""How have you been feeling lately? \n 
                            a. I feel mostly okay, just a bit stressed sometimes - 2 \n
                            b. I’ve been feeling low or anxious often - 1 \n
                            c. I feel overwhelmed or hopeless most of the time - 0 \n
                            """))

duration_distress = int(input(""" How long have you been feeling this lately? \n 
                            a. Just for a few days - 2 \n
                            b. For a few weeks - 1 \n
                            c. For a few months or longer - 0 \n
                        """))

type_concern = int(input(""" What would you like to talk about? \n 
                            a. Work or study stress - 2 \n
                            b. Relationship or social issues - 2 \n
                            c. Motivation, self-improvement, or daily balance - 1 \n
                            d. Trauma, loss, or deep emotional pain - 0 \n
                            e. Thoughts of self-harm or crisis situations - 0 \n
                        """))

urgency_level = int(input(""" Do you feel safe right now? \n 
                            a. Yes, I feel safe - 2 \n
                            b. I’m not sure - 1 \n
                            c. No, I need urgent help - 0 \n
                        """))

support_style = int(input(""" How would you like yours sessions to feel? \n 
                            a. Short and focused — I like quick, frequent check-ins - 2 \n
                            b. Balanced — A mix of chat and reflection - 1 \n
                            c. In-depth — I want deep conversations and guidance - 0 \n
                        """))

openness_to_technology = int(input(""" How comfortable are you taking with an AI chatbot? \n 
                            a. Very comfortable — I actually prefer it - 2 \n
                            b. Somewhat comfortable — I can give it a try - 1 \n
                            c. Not comfortable — I’d rather talk to a person - 0 \n
                        """))

time_availability = int(input(""" How much time can you dedicate per session? \n 
                            a. 10–15 minutes at a time - 2 \n
                            b. 30–45 minutes - 1 \n
                            c. Around an hour or more - 0 \n
                        """))

issue_clarity = int(input(""" Do you know what's been bothering you? \n 
                            a. Yes, I can describe it clearly - 2 \n
                            b. Kind of, but I’m not sure what’s causing it - 1 \n
                            c. Not really — I just feel off or confused - 0 \n
                        """))

user_data = np.array([[current_emotion,
                    duration_distress,
                    type_concern,
                    urgency_level,
                    support_style,
                    openness_to_technology,
                    time_availability,
                    issue_clarity
                ]])

prediction = model.predict(user_data)

if prediction == 2 :
    print('We suggest you to try our AI experience')
elif prediction == 1:
    print('We suggest you to have consult human therapists and have our AI experience as well')
else:
    print('We suggest you to consult human therapists')