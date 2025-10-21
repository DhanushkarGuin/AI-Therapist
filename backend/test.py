import sys
print("ready", flush=True)
for line in sys.stdin:
    print(f"echo: {line.strip()}", flush=True)
