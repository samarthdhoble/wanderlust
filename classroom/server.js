const express = require('express');
const app = express();

const userRouter = require('./routers/user');
const postRouter = require('./routers/post');



app.use(express.json());

app.get('/' , (req , res ) => {
  res.send('Welcome to the Classroom API');
})

app.use('/users' , userRouter);
app.use('/posts' , postRouter);

// ----------- Server Start -----------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
