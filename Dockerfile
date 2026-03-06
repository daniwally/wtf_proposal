FROM python:3.11-slim

WORKDIR /app

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy backend and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend and build
COPY frontend/package.json frontend/yarn.lock ./frontend/
WORKDIR /app/frontend
RUN yarn install

COPY frontend/ ./
RUN yarn build

# Copy backend
WORKDIR /app
COPY backend/ ./backend/

# Expose port
EXPOSE 8001

# Start backend
CMD ["uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8001"]
