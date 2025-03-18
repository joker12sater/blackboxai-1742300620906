#!/bin/bash

# Kill any process using port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null

# Start backend server
cd backend && npm install && npm run dev &

# Start frontend server
cd frontend && npm start