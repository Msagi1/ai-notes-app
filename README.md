# AI Notes App (Frontend)

A simple Angular application that allows users to write notes and get AI-generated responses.

This app demonstrates:
- Modern Angular (standalone components, signals, new router)
- Async data handling
- Integration with a secure backend for GenAI calls

## Tech Stack
- Angular 18+
- TypeScript
- Signals
- Angular Router
- HttpClient (refactor planned)
- Basic CSS

## How it works
- Users enter a prompt in the UI
- The app sends the prompt to a backend API
- The backend securely calls the OpenAI API
- The AI response is displayed in the UI

## Backend
The frontend depends on a separate backend service for AI calls:
👉 https://github.com/Msagi1/ai-notes-server

(The backend handles OpenAI API calls and keeps API keys secure.)

## Running locally
```bash
npm install
ng serve