from huggingface_hub import login
from transformers import pipeline, AutoTokenizer
from dotenv import load_dotenv
import os

# --- Loading Pipeline --- #
load_dotenv('.env.ai_summ')
access_token = os.getenv('API_KEY')
login(access_token)

class TranscriptSummarizer:
    def __init__(self, model_name="philschmid/bart-large-cnn-samsum", chunk_token_limit=14000):
        self.model_name = model_name
        self.chunk_token_limit = chunk_token_limit
        self.summarizer = pipeline("summarization", model=model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

    def _summarize_chunk(self, text, min_length=100, max_length=500):
        summary = self.summarizer(text, min_length=min_length, max_length=max_length)
        return summary[0]['summary_text']

    def summarize_text(self, text, min_length=100, max_length=500):
        tokens = self.tokenizer.encode(text)
        print(f"🔹 Transcript length: {len(tokens)} tokens")

        if len(tokens) <= self.chunk_token_limit:
            return self._summarize_chunk(text, min_length, max_length)

        summaries = []
        for i in range(0, len(tokens), self.chunk_token_limit):
            chunk_tokens = tokens[i:i + self.chunk_token_limit]
            chunk_text = self.tokenizer.decode(chunk_tokens, skip_special_tokens=True)

            print(f"Summarizing chunk {len(summaries)+1}...")
            chunk_summary = self._summarize_chunk(chunk_text, min_length, max_length)
            summaries.append(chunk_summary)

        merged_text = " ".join(summaries)
        print("\nFinished chunking. Now generating final meta-summary...")

        return self._summarize_chunk(merged_text, min_length, max_length)

    def summarize_from_file(self, input_file, output_file="summary.txt", min_length=100, max_length=500):
        with open(input_file, "r", encoding="utf-8") as f:
            transcript = f.read()

        final_summary = self.summarize_text(transcript, min_length, max_length)

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(final_summary)

        print(f"\nFinal Summary saved in {output_file}")
        return final_summary
