import random
import pandas as pd

questions = {
    "emotional_state": [2, 1, 0],
    "duration": [2, 1, 0],
    "concern_type": [2, 2, 1, 0, 0],
    "urgency": [2, 1, 0],
    "support_style": [2, 1, 0],
    "tech_openness": [2, 1, 0],
    "availability": [2, 1, 0],
    "clarity": [2, 1, 0]
}

def generate_sample():
    sample = {q: random.choice(opts) for q, opts in questions.items()}
    total_score = sum(sample.values())
    if total_score >= 12:
        label = "AI"
    elif total_score >= 8:
        label = "Hybrid"
    else:
        label = "Human"
    sample["label"] = label
    return sample

# --- Create Train Set ---
train_data = []
for _ in range(8000):
    train_data.append(generate_sample())

train_df = pd.DataFrame(train_data)

# --- Create Test Set ensuring no overlap ---
test_data = set()  # store tuples for fast lookup
train_set = set(tuple(row) for row in train_df.drop(columns=["label"]).itertuples(index=False, name=None))

while len(test_data) < 2000:  # say 1.5k test samples
    sample = generate_sample()
    sample_tuple = tuple(sample[q] for q in questions.keys())
    if sample_tuple not in train_set and sample_tuple not in test_data:
        test_data.add(sample_tuple)

test_df = pd.DataFrame([dict(zip(questions.keys(), t)) for t in test_data])
# add labels again
def label_fn(row):
    total = sum(row.values)
    if total >= 12:
        return "AI"
    elif total >= 8:
        return "Hybrid"
    else:
        return "Human"

test_df["label"] = test_df.apply(label_fn, axis=1)

# --- Save ---
train_df.to_csv("therapy_train.csv", index=False)
test_df.to_csv("therapy_test.csv", index=False)

print(f"Train: {len(train_df)} rows, Test: {len(test_df)} rows")