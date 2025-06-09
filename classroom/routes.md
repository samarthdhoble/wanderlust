📘 EXPRESS ROUTER -> 

  Express Router is a way to create modular, mountable route handlers in separate files, helping keep your code clean and organized.

📁 Example File Structure with Router ->

    project/
  ├── server.js            // Main server file
  ├── routes/
  │   ├── userRoutes.js    // All user-related routes
  │   └── postRoutes.js    // All post-related routes


📌Simply require like this -> 

  const userRouter = require('./routers/user');
  const postRouter = require('./routers/post');



📌Then use it like a middleware -> 

  app.use('/users' , userRouter);
  app.use('/posts' , postRouter);

