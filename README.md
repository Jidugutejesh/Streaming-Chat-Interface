# Streaming Chat Interface
A real-time streaming chat application built with React 18 that connects to a live LLM API (Groq) and renders responses token-by-token.
It dynamically detects and displays text, JSON, numbers, and tables with custom layouts and styling.
This project demonstrates how to handle streaming HTTP responses, dynamic content rendering, and real-time UI updates in a frontend-only application.

## Setup Instructions
1. Clone the repository

git clone https://github.com/Jidugutejesh/Streaming-Chat-Interface.git  
cd Streaming-Chat-Interface/streaming-chat

2. Install dependencies

npm install

3. Start the development server

npm run dev

Open in browser: http://localhost:5173

---

## How to Configure API Key
1. Create a .env file in the root:

VITE_API_URL=https://api.groq.com/openai/v1/chat/completions  
VITE_API_KEY=your_groq_api_key_here

2. Restart the dev server.

---

## Features
- Real-time word-by-word streaming
- Supports multiple data formats:
   Plain text
   Numbers
   JSON (formatted)
   Tables
- Dynamic layouts based on response type
- Stop generation button
- Loading indicators
- Error handling & stream lifecycle states
- Responsive UI (Tailwind CSS)
- Message history management
- Environment-based API key configuration

---

## Challenges Faced
- Parsing streaming chunks  
- Detecting data types  
- Handling abort logic  
- Managing fast token streams  
- API errors and CORS issues
