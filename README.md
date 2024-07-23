# MERN Quantum-IT-Task-Assignment

This repository contains a MERN (MongoDB, Express, React, Node.js) stack project for a login and registration system. The project includes user authentication, Google login, registration, and session management. It uses Tailwind CSS for styling.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Follow these steps to set up and run both the backend and frontend of the project:

### 1. Clone the Repository

```bash
git clone https://github.com/Deepak931014/Quantum-IT-Task-Assignment.git
cd your-repo

2. Set Up the Backend
Navigate to the backend directory:

bash
Copy code
cd backend
Install the necessary Node modules:

bash
Copy code
npm install
Set up environment variables by creating a .env file in the backend directory with the following variables:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
Start the backend server:

bash
Copy code
npm start
The backend server will run on http://localhost:5000 by default.

3. Set Up the Frontend
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install the necessary Node modules:

bash
Copy code
npm install
Set up environment variables by creating a .env file in the frontend directory with the following variables:

env
Copy code
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
Start the frontend application:

bash
Copy code
npm start
The frontend application will run on http://localhost:3000 by default.

Features
User Authentication: Secure login and registration system.
Google Authentication: Login using Google.
Tailwind CSS: Modern and responsive design.
JWT Authentication: Secure token-based authentication.
Usage
Backend API: Available at http://localhost:5000/api
Frontend Application: Available at http://localhost:3000
Contributing
Feel free to open issues or pull requests if you find any bugs or want to contribute to the project.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
React
Node.js
MongoDB
Express
Tailwind CSS
Firebase Auth
