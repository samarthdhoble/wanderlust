# 🛡️ User Authentication using Passport.js (Local Strategy)

This guide helps you set up user authentication in your Node.js/Express app using:

- `passport`
- `passport-local`
- `passport-local-mongoose`
- `express-session`
- `mongoose`

---

## 📦 Packages Used

```bash
npm install passport
npm passport-local 
npm passport-local-mongoose 
npm express-session 
npm mongoose


-------------------------------------------------------------------------------------------------------

📁 1. User Model (models/user.js) ->


  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const passportLocalMongoose = require('passport-local-mongoose');

  const userSchema = new Schema({
    email: {
      type: String,
      required: true
    }
  });

  // Adds username, hash, salt fields + authentication methods
  userSchema.plugin(passportLocalMongoose);

  module.exports = mongoose.model('User', userSchema);


------------------------------------------------------------------------------------------------------

⚙️ 2. Express App Configuration (app.js)

  const session = require('express-session');
  const passport = require('passport');
  const LocalStrategy = require('passport-local');
  const User = require('./models/user'); // your User model

  // Session middleware ->

  app.use(session({
    secret: 'yourSecretKey', // 🔐 change this in production
    resave: false,
    saveUninitialized: false
  }));


  // Initialize Passport and session ->

  app.use(passport.initialize()); // 👈 must before routes
  app.use(passport.session());

  // Set up Passport to use LocalStrategy ->

  passport.use(new LocalStrategy(User.authenticate()));

  // Handles how user is stored in session ->

  passport.serializeUser(User.serializeUser()); // stores user ID in session
  passport.deserializeUser(User.deserializeUser()); // gets full user from ID



-------------------------------------------------------------------------------------------------------


🔄 Line-by-Line Passport.js Auth Functions Explained ->

  passport.initialize()
  // Initializes Passport in your app. Must be used before routes.

  passport.session()
  // Enables persistent login sessions using express-session.

  User.authenticate()
  // Authentication logic (username + password) provided by passport-local-mongoose.

  User.serializeUser()
  // Defines how to store user data (user ID) into the session.

  User.deserializeUser()
  // Defines how to retrieve full user info from the stored session ID.

  userSchema.plugin(passportLocalMongoose)
  // Adds username, password, hashing, salting, and helper methods (register, authenticate) to your User schema.

------------------------------------------------------------------------------------------------

🔐 Why Use Passport in Every Project?
->
  Handles complex authentication logic for you

  Secure session-based login with minimal code

  passport-local-mongoose reduces boilerplate

  Easily extendable to Google/GitHub/etc. later

  Perfect for production-ready login systems



✅ Summary-> 

  Use passport-local for basic username/password auth

  Use passport-local-mongoose to simplify schema & methods

  Always initialize passport and set up session() middleware

  Use serialize/deserializeUser() to manage login sessions

