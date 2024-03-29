﻿

# Realtime Chat App

This is a realtime chat application that supports private and group chats using websockets. It also integrates authentication using the Clerk API.

## Technologies Used

- Frontend: Vite, React, Material-UI, Socket.IO client
- Backend: Node.js, Express, Socket.IO, WebSocket
- External API: Binance WebSocket API

## Folder Structure

- `client`: Contains the Vite/React code for the frontend UI.
- `server`: Contains the Express server files.
  - `chat`: Handles chat functionality, including sending and receiving data between clients and the server.
  - `express-server`: Contains files for the Express server.
  - `web-socket`: Manages real-time WebSocket stream data from the Binance WebSocket API.

## Installation

1. Clone the repository.
2. Install dependencies for the frontend:
   ```sh
   cd client
   npm install
   npm run dev
   ```
3. Install dependencies for the backend:
   ```sh
   cd ../
   npm install
   npm start
   ```
4. Open the application in your browser at `http://localhost:5173`.

## Usage

1. Register or login using Clerk API authentication.
2. Start chatting in private or group chats.
3. Real-time updates are handled through Socket.IO and WebSocket.

---

