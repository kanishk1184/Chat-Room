# Chat‑Room

A simple real‑time chat lobby application built to practice and
experiment with WebSockets. This project includes both a backend server
and a frontend client so you can run the entire app locally and test
real‑time messaging between multiple users.

------------------------------------------------------------------------

## Features

-   Real‑time messaging using WebSockets
-   Simple chat lobby interface
-   Multiple users can join and chat simultaneously
-   Beginner‑friendly project for learning WebSocket communication

------------------------------------------------------------------------

## Project Structure

Chat‑Room/ ├── backend/ → WebSocket server\
├── frontend/ → React client application\
├── .gitignore\
└── README.md

------------------------------------------------------------------------

## Getting Started

### Requirements

Make sure you have installed:

-   Node.js (v14 or higher recommended)
-   npm or yarn

------------------------------------------------------------------------

## Clone the Repository

``` bash
git clone https://github.com/kanishk1184/Chat-Room.git
cd Chat-Room
```

------------------------------------------------------------------------

## Run the Backend (WebSocket Server)

``` bash
cd backend
npm install
npm start
```

This starts the WebSocket server.

------------------------------------------------------------------------

## Run the Frontend (Client)

Open a new terminal and run:

``` bash
cd frontend
npm install
npm start
```

The frontend will start on:

http://localhost:3000

------------------------------------------------------------------------

## How to Use

1.  Open the frontend in your browser.
2.  Open multiple tabs or different browsers to simulate multiple users.
3.  Enter your username (if prompted).
4.  Start sending messages.
5.  Messages will appear instantly for all connected users.

------------------------------------------------------------------------

## Notes

-   This project is built for learning purposes.
-   It does not include authentication or database storage.
-   You can extend it by adding:
    -   User authentication
    -   Chat rooms
    -   Message persistence (MongoDB)
    -   Typing indicators
    -   Online user tracking

------------------------------------------------------------------------

## License

This project is open-source and free to use.
