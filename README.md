## 21 Savage Fan Site & Message Board
A full-stack web application dedicated to 21 Savage featuring secure user authentication via Passport.js, MongoDB native driver data persistence, and an interactive message board where users can post messages, vote, and manage content.

## Live Demo
**Render Deployment:** https://savage-auth-y4yv.onrender.com/

## Features
**User Authentication:** Secure local login, registration, and session management powered by Passport.js with flash messaging.

**Interactive Message Board:** Post messages, upvote or downvote entries dynamically, and delete items from the board.

**Native MongoDB Integration:** Direct database interactions utilizing the MongoDB native driver and ObjectId queries.

**Protected Profile Route:** Middleware-secured dashboard views (/profile) restricted to authenticated users.

**Bootstrap Styling:** Clean UI layout utilizing Bootstrap 3 and Font Awesome icons.

## Routes & Endpoints
**GET** / — Renders the home page with login and signup links.

**GET** /profile — Renders the secure user profile and message board (requires authentication).

**GET** /login — Renders the user login form.

**POST** /login — Authenticates user credentials via Passport local strategy.

**GET** /signup — Renders the new user registration form.

**POST** /signup — Registers a new user account.

**GET** /logout — Terminates the user session and redirects home.

POST /messages — Inserts a new message document into the database.

PUT /up — Increments the vote counter (thumbUp) for a specific message ID.

PUT /down — Decrements the vote counter for a specific message ID.

DELETE /delete — Removes a message document from the database by its ObjectId.

## How It Works
Authentication Flow: Users register or log in on the landing page, establishing a secure session managed by Passport.js and Express session middleware.

Message Operations: Once authenticated on the profile page, users can submit new thoughts to the message board or interact with upvote/downvote and delete controls linked to asynchronous backend routes.

Database Persistence: The application uses the native MongoDB driver to query, update, and delete documents using unique ObjectId references.

## How to Set Up
Prerequisites
Node.js installed on your machine

A MongoDB database connection URI

Installation Commands
Clone the repository:
`git clone https://github.com/your-username/your-repo-name.git`

Navigate into the project folder:
`cd your-repo-name`

## Install dependencies:
`npm install`

Configure Environment Variables:
Create a .env file in the root directory and add your MongoDB connection string and port:
MONGODB_URI=your_mongodb_connection_string
PORT=8080

Run the application:
`npm start`

The server will start on http://localhost:8080 (or your configured port).

## Built With
Node.js

Express.js

MongoDB 

Passport.js (Local Authentication)

Express Session & Connect Flash

EJS (Embedded JavaScript Templating)

Bootstrap 3 & Font Awesome

<img width="2553" height="966" alt="image" src="https://github.com/user-attachments/assets/fb71f104-31d8-4858-ac1a-64af84e8b3a7" />

