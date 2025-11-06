# 21 Savage Fan Site

A full-stack community site for 21 Savage fans featuring user authentication, an interactive message board, and real-time voting. Built with Node.js, Express, and MongoDB.

![Node.js](https://img.shields.io/badge/node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=flat&logo=mongodb&logoColor=white)
![Passport](https://img.shields.io/badge/passport-34E27A?style=flat&logo=passport&logoColor=white)

---

## Features

- **User Authentication** — Secure signup and login with email and password
- **Message Board** — Post shoutouts and messages to the community
- **Voting System** — Like or dislike messages with instant feedback
- **Message Management** — Delete messages you've posted
- **Real-time Updates** — Dynamic content loading without page refreshes
- **Responsive Design** — Works on desktop and mobile devices

---

## Demo

### Main Page
![Main Page](public/img/main.png)

### Login Page
![Login Page](public/img/login.png)

### Signup Page
![Signup Page](public/img/signup.png)

### Profile Page
![Profile Page](public/img/profile.png)

## 🌐 Live Demo
[View Demo](https://savage-auth-dht9.onrender.com)

## Tech Stack

| Component       | Technology                           |
|-----------------|--------------------------------------|
| **Backend**     | Node.js, Express.js                  |
| **Database**    | MongoDB (MongoDB Atlas)              |
| **Authentication** | Passport.js (Local Strategy)      |
| **View Engine** | EJS (Embedded JavaScript Templates)  |
| **Frontend**    | Vanilla JavaScript, Fetch API        |
| **Styling**     | Bootstrap 3, Font Awesome 4          |
| **Security**    | bcrypt-nodejs (password hashing)     |

---

## Project Structure

```
21-savage-fan-site/
│
├── app/
│   ├── models/
│   │   └── user.js              # User schema & password methods
│   └── routes.js                # All API routes & middleware
│
├── config/
│   ├── database.js              # MongoDB connection config
│   └── passport.js              # Authentication strategies
│
├── public/
│   ├── style.css                # Custom styles
│   ├── main.js                  # Client-side interactions
│   └── img/                     # Static assets
│
├── views/
│   ├── index.ejs                # Landing page
│   ├── login.ejs                # Login form
│   ├── signup.ejs               # Signup form
│   ├── profile.ejs              # User dashboard & messages
│   └── connect-local.ejs        # Account linking
│
├── server.js                    # Application entry point
├── package.json                 # Dependencies & scripts
└── README.md                    # Documentation
```

---

## Getting Started

### What You'll Need

Before you start, make sure you have:
- Node.js (version 12 or higher)
- npm or yarn installed
- A MongoDB Atlas account (the free tier works perfectly)

### Installation Steps

**1. Clone the repository**
```bash
git clone https://github.com/abdirxhmxn/21-savage-fan-site.git
cd 21-savage-fan-site
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure your database**

Open `config/database.js` and replace the connection string with your own MongoDB Atlas credentials:

```javascript
module.exports = {
  'url': 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/21savage?retryWrites=true&w=majority',
  'dbName': '21savage'
};
```

**4. Start the server**
```bash
node server.js
```

**5. Visit the site**

Open your browser and go to `http://localhost:8080`

---

## How It Works

### User Journey

The app follows a straightforward flow: visitors land on the homepage where they can choose to sign up or log in. Once authenticated, users gain access to their profile page where they can post messages, interact with other posts through likes and dislikes, and manage their own content. All interactions happen in real-time without requiring page refreshes.

### API Endpoints

| Method | Endpoint          | Description                    |
|--------|-------------------|--------------------------------|
| GET    | `/`               | Home page                      |
| GET    | `/login`          | Login form                     |
| POST   | `/login`          | Authenticate user              |
| GET    | `/signup`         | Signup form                    |
| POST   | `/signup`         | Create new account             |
| GET    | `/profile`        | User dashboard (protected)     |
| GET    | `/logout`         | End session                    |
| POST   | `/messages`       | Create new message             |
| PUT    | `/messages`       | Increment vote count           |
| PUT    | `/messagesDown`   | Decrement vote count           |
| DELETE | `/delete`         | Remove message                 |

### Security

The application takes security seriously. All passwords are hashed using bcrypt before being stored in the database. User sessions are managed securely with express-session, and protected routes require authentication middleware. The app also implements flash messages for user feedback and secure cookie handling.

---

## Contributing

Contributions are always welcome. If you'd like to improve this project, here's how:

**1. Fork the repository**

**2. Create a new branch**
```bash
git checkout -b feature/your-feature-name
```

**3. Make your changes and commit**
```bash
git commit -m "Add your feature description"
```

**4. Push to your fork**
```bash
git push origin feature/your-feature-name
```

**5. Open a Pull Request**

### Ideas for Contributions

If you're looking for ways to contribute, consider:
- Adding social media authentication (Twitter, Google, Facebook)
- Implementing threaded comments or replies
- Creating user profile pages with avatars
- Building admin moderation tools
- Improving mobile responsiveness
- Adding search and filter functionality
- Implementing pagination for the message board
- Adding unit and integration tests

---

## Known Issues & Future Plans

There are several areas where this project could be improved:

- Input validation and sanitization needs to be strengthened
- Rate limiting should be implemented to prevent abuse
- The message board would benefit from pagination
- User profile pages could display posting history
- Image upload support would enhance user engagement
- WebSockets could enable real-time updates without refreshing
- A comprehensive test suite would improve reliability

---

## License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute it as you see fit.

---

## Additional Resources

If you want to learn more about the technologies used in this project:

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Passport.js Documentation](http://www.passportjs.org/)
- [EJS Documentation](https://ejs.co/)

---

Built for 21 Savage fans by fans.
