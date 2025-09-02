from vosk import Model
import os

# --- Model Extraction --- #
model_path = os.path.abspath("note-taking/vosk_model/vosk-model-small-en-us-0.15")
vosk_model = Model(model_path)
