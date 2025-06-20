if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
port = 3000;
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/review.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const userRoutes = require('./routes/user.js');

const dbUrl = process.env.MONGOATLAS_URL;

// Middleware
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs' , ejsMate);



// Mongo DB connection
const MONGOURL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
})

async function main(){
  await mongoose.connect(dbUrl); 
}


const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto :{
    secret : process.env.SECRET,
  },
  touchAfter : 24*3600
});


store.on('error' , () => {
  console.log('error in mongo session store' , err)
})

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false ,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() * 7 * 24 * 60 *60 *1000,
    maxAge : 7 * 24 * 60 *60 *1000,
    httpOnly: true
  }
};




app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res , next )=>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
})


// Routes
app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes)
app.use('/' , userRoutes);
  
 


// At the very end of all routes ERROR HANDLING
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
 
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // This will log the full error stack trace
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { statusCode, message });
});



// server listening
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})