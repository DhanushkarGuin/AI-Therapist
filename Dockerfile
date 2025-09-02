# Use Python base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of the project
COPY . .

# Run your main app (change if different)
CMD ["python"]
