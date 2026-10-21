# Express Auth Message Board

A full-stack message board where users sign up, log in, and post messages that everyone can vote on. Each message can be liked, disliked, or deleted, and every change is saved to MongoDB so the board stays up to date for all users.

[![Screenshot-2026-10-21-at-5-31-19-AM.png](https://i.postimg.cc/25dFfqdh/Screenshot-2026-10-21-at-5-31-19-AM.png)](https://postimg.cc/McTj7pFp)

[![Screenshot-2026-10-21-at-5-30-53-AM.png](https://i.postimg.cc/mZp3RWML/Screenshot-2026-10-21-at-5-30-53-AM.png)](https://postimg.cc/QV5KkP0w)

## How It's Made:

**Tech used:** 

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)

This project started from an existing authentication codebase, and my job was to clean it up and get the thumbs-down feature working end to end.

Authentication is handled with Passport.js using a local strategy. When a user signs up, their account is stored in MongoDB through a Mongoose model, and sessions keep them logged in as they move around the app. The profile page is protected by middleware that redirects anyone who isn't logged in.

The message board runs on Express routes that talk directly to MongoDB. On the server, the `/profile` route pulls every message from the database and hands the array to an EJS template, which loops through it and renders each message with its vote count and icons. On the client, `main.js` attaches click listeners to the thumbs-up, thumbs-down, and trash icons. When one is clicked, it walks up the DOM to the message's list item, reads the name and message text, and sends a `fetch` request to the matching route:

- `PUT /like` increases the vote count with MongoDB's `$inc` operator
- `PUT /dislike` decreases it the same way
- `DELETE /remove` deletes the message

After each request the page reloads, the server reads the updated data, and EJS renders the new state.

## Optimizations

- **Fixed the thumbs-down feature.** The icon existed, but the client and server weren't connected correctly. I gave each action its own clearly named route and made sure the routes in `main.js` and `routes.js` matched.
- **Let the server do the math.** The client used to send the current vote count with every request. Since `$inc` updates the count in the database directly, I removed the unused data from the requests so the server is the single source of truth.
- **Prevented accidental documents.** The update routes used `upsert: true`, which could create a brand-new message if the original had been deleted. I turned it off so votes only ever update existing messages.
- **Cleaned up the codebase.** I removed unused imports and fields, renamed confusing variables, updated old Express syntax (`res.status(500).send(err)`), and upgraded Font Awesome so the trash icon displays correctly.

## Lessons Learned:

The biggest lesson was understanding how data flows through a full-stack app. The EJS template never changes on its own. Every update goes from a click in the browser, to a route on the server, to the database, and back through a fresh page render. Once I could trace that loop, debugging became much easier.

I also learned how `parentNode` and `childNodes` work, including that whitespace between HTML tags counts as text nodes. That's why the code reads `childNodes[1]` and `childNodes[3]`, and it showed me how fragile DOM traversal by index can be compared to selecting elements by class.

Finally, I learned to check package versions before applying a fix. A logout change that's correct for newer versions of Passport broke logout in the older version this project uses, which taught me to read `package.json` before assuming how a library behaves.

## Installation

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Navigate to `localhost:8080`
