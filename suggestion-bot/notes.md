# Synthetic Data

## Preparation

### Criteria

    1. Current Emotional State - "How have you been feeling lately?"
        a. I feel mostly okay, just a bit stressed sometimes - 2
        b. I’ve been feeling low or anxious often - 1
        c. I feel overwhelmed or hopeless most of the time - 0

    2. Duration of Distress - "How long have you been feeling this lately?"
        a. Just for a few days - 2
        b. For a few weeks - 1
        c. For a few months or longer - 0
        
    3. Type of concern - "What would you like to talk about?"
        a. Work or study stress - 2
        b. Relationship or social issues - 2
        c. Motivation, self-improvement, or daily balance - 1
        d. Trauma, loss, or deep emotional pain - 0
        e. Thoughts of self-harm or crisis situations - 0

    4. Urgency Level - "Do you feel safe right now?"
        a. Yes, I feel safe - 2
        b. I’m not sure - 1
        c. No, I need urgent help - 0

    5. Preferred Support Style - "How would you like yours sessions to feel?"
        a. Short and focused — I like quick, frequent check-ins - 2
        b. Balanced — A mix of chat and reflection - 1
        c. In-depth — I want deep conversations and guidance - 0

    6. Openness to technology - "How comfortable are you taking with an AI chatbot?"
        a. Very comfortable — I actually prefer it - 2
        b. Somewhat comfortable — I can give it a try - 1
        c. Not comfortable — I’d rather talk to a person - 0

    7. Availability - "How much time can you dedicate per session?"
        a. 10–15 minutes at a time - 2
        b. 30–45 minutes - 1
        c. Around an hour or more - 0

    8. Clarity of Issue - "Do you know what's been bothering you?"
        a. Yes, I can describe it clearly - 2
        b. Kind of, but I’m not sure what’s causing it - 1
        c. Not really — I just feel off or confused - 0


### Rules

    if total_score >= 12:
        label = "AI"
    elif 8 <= total_score < 12:
        label = "Hybrid"
        else:
    label = "Human"
