const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { model } = require('mongoose');
const User = require('../models/user.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const usersController = require('../controllers/users.js');

// Render signup page 
router.get('/signup' , 
  usersController.renderSignupForm
);


// Actual signup route 
router.post('/signup' ,
  wrapAsync (usersController.signup)
);


// Render login form
router.get('/login',
  usersController.renderLoginForm
);


// Actual login feature / route
router.post('/login' ,
  saveRedirectUrl,
  passport.authenticate('local' ,
    {failureRedirect : '/login' , failureFlash: true}),
  usersController.login
);


// LOGOUT ROUTE
router.get('/logout' , 
  usersController.logout
);


module.exports = router;
