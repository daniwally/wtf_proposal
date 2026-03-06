# WTF Agency - Wine Proposal

Proposal landing page for wine brand development services.

## Structure
- `/backend` - FastAPI backend
- `/frontend` - React frontend

## Deploy to Railway

1. Connect this repo to Railway
2. Add MongoDB service
3. Set environment variables:
   - `MONGO_URL` (from Railway MongoDB)
   - `DB_NAME=wtf_proposals`
   - `PORT=8001`

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend
cd frontend
yarn install
yarn start
```
