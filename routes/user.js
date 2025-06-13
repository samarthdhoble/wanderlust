const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const usersController = require('../controllers/users.js');


// ========== SIGNUP ROUTES ==========


router.route('/signup')
  .get(usersController.renderSignupForm)         // Render signup form
  .post(wrapAsync(usersController.signup));      // Handle signup logic

// ========== LOGIN ROUTES ==========

router.route('/login')
  .get(usersController.renderLoginForm)          // Render login form
  .post(
    saveRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    usersController.login                        // Handle login
  );

// ========== LOGOUT ROUTE ==========

router.get('/logout', usersController.logout);   // Logout


module.exports = router;
