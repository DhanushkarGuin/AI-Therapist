import json
import wave
import subprocess
from vosk import KaldiRecognizer
from model import vosk_model

# --- Transcription Funciton --- #
def transcribe(audio_file):
    print(f"Transcribing {audio_file}...")
    wf = wave.open(audio_file, 'rb')
    rec = KaldiRecognizer(vosk_model, wf.getframerate())
    transcript=[]

    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            result = json.loads(rec.Result())
            transcript.append(result.get("text", ""))
    transcript.append(json.loads(rec.FinalResult()).get("text", ""))

    final_text = " ".join(transcript)
    return final_text

# --- Extract Audio if Video --- #
def extract_audio(input_file, output_file="output.wav"):
    if input_file.endswith(".mp3") or input_file.endswith(".wav"):
        return input_file  # already audio
    print("Extracting audio from video...")
    subprocess.run([
        "ffmpeg", "-i", input_file, "-ar", "16000", "-ac", "1", output_file, "-y"
    ])
    return output_file

# --- Convert text into a .txt file --- #
def conversion(final_text):
    with open("transcription.txt", "w", encoding="utf-8") as f:
        f.write(final_text)

    print("Transcript saved as transcript.txt")