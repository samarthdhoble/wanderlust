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



-------------------------------------------------------------------------------------------------------------------


# 🔐 Passport.js Login Flow Explained (Local Strategy)

This guide explains how Passport.js is used to authenticate users when they **log in**, using the following route handlers:

---

## 📍 Route: GET `/login`

```js
router.get('/login', (req, res) => {
  res.render('users/login.ejs');
});



-----------------------------------------------------------------------------------------------------


📍 Route: POST /login -> 


  router.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    async (req, res) => {
      req.flash('success', 'Login successful');
      res.redirect('/listings');
    }
  );


  🔍 Step-by-step Breakdown: ->

      1. passport.authenticate('local')
        Purpose: Triggers Passport's LocalStrategy (username/password) authentication.

        Where it comes from: You configured passport.use(new LocalStrategy(User.authenticate())) earlier in app.js.

        What it checks: Matches the submitted username and password with those in your database (handled internally by passport-local-mongoose).

      2. failureRedirect: '/login'
        If authentication fails (invalid username or password), the user is redirected back to the login page.

      3. failureFlash: true
        If login fails, a flash message (like “Invalid credentials”) is stored and displayed using connect-flash.


      4. Success Callback Function

        async (req, res) => {
          req.flash('success', 'Login successful');
          res.redirect('/listings');
        }


        -> This function runs only if authentication is successful.

        -> req.flash('success', ...) — stores a success message.

        -> res.redirect('/listings') — sends the logged-in user to the listings page (or any protected route).



passport.authenticate('local') -> Uses LocalStrategy to validate username and password

failureRedirect -> Sends user back to /login if auth fails

failureFlash ->	Shows an error message if login fails