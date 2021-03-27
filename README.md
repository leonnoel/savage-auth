# full-stack-app-savage-auth

This is a full-stack appliaction with authentication where the users can write messages to a message board. Other users can read their messages and like/dislike their messages. 

Link to Project: https://complex-savage.herokuapp.com/

![Project Image](/public/img/project.png)


### How It's Made:

This project uses EJS, CSS, and JavaScript on the front-end and Node.js + Express.js, and MongoDB on the back-end. 

The user fills out their note and submits it. This submission is sent as a request to the server. The details of their note is sent and stored to a database in MongoDB. Then, the server requests the data from the database, the data is sent as a response to the front-end so that the information can be rendered dyanmically through EJS. 


### Lesson Learned

I learned how to use CRUD functions to operate on stored data in MongoDB. Also, I learned how to use EJS, a simple templating language that allow us to generate HTML markup with Javascript.  
 

###