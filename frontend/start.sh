#!/bin/bash

# Kill any process using port 8000
echo "Checking if port 8000 is in use..."
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs -r kill -9

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the development server
echo "Starting development server..."
npm start