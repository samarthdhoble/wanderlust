const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const session = require('express-session');

// app.use(cookieParser())

// app.use(express.json());

app.get('/' , (req , res ) => {
  res.send('Welcome to the Classroom API');
})

// app.use('/users' , userRouter);
// app.use('/posts' , postRouter);


// app.get('/getcookie' , (req, res) => {
//   res.cookie('greet' , 'hello world');
//   res.send('Cookie has been set');
// })

// app.get('/cookieuse' , (req , res) => {
//   let { name = 'random' } = req.cookies;
//   res.send(`Hello ${name}, welcome to the cookie use endpoint!`);
// })

// app.get('/showcookie' , (req, res) => {
//   console.log(req.cookies);
//   res.send(req.cookies);
// })

const sessionOptions = {
  secret : "mysecretString" ,
  resave : false ,
  saveUninitialized : true
}


app.use(session(sessionOptions));

app.get('/test' , (req , res) => {
  res.send('Session Test Endpoint');
})



app.get('/register', (req ,res) => {
  let { name = 'anonymous'  } = req.query;
  req.session.name = name;
  res.redirect('/hello');
})


app.get('/hello' , (req,res) => {
  res.send(`Hello  ${req.session.name} ` );
})

// SESSION COUNT EXAMPLE -> 

// app.get('/reqcount' , (req , res) => {

//   if(req.session.count){
//     req.session.count++;
//   }else{
//     req.session.count = 1;
//   }
 

//   res.send(`you sent a request ${req.session.count} times`)
// })



// ----------- Server Start -----------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
