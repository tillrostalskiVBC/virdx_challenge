FROM python:3-slim

WORKDIR /app

COPY . /app

# Install dependencies required for psycopg2-binary (PostgreSQL support)
RUN apt-get update
RUN apt-get install -y libpq-dev gcc

# Install Python dependencies
RUN python3 -m pip install -r requirements.txt --no-cache-dir

# Cleanup
RUN apt-get autoremove -y gcc
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*

EXPOSE 8000

CMD ["./scripts/start-reload.sh"]