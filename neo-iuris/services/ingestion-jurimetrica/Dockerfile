# Hardening: Use slim image to reduce attack surface
FROM python:3.9-slim

# Strengthening: Set environment variables for safer execution
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Consolidation: Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY src/ src/

# Fortify: Switch to non-root user
USER appuser

# Heuristic: Default command uses the investigation probe
CMD ["python", "src/probe_scjn.py"]
