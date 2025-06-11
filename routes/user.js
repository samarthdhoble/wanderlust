const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { model } = require('mongoose');
const User = require('../models/user.js');
const passport = require('passport');


router.get('/signup' , (req ,res) => {
  res.render('users/signup.ejs');
})

router.post('/signup' ,
  wrapAsync (
  async (req , res) => {
    try{
      let {username ,email , password } = req.body;
      const newUser = new User({
        username,
        email
      });

      const regUser = await User.register(newUser , password);
      console.log(regUser);
      req.flash('success', 'Welcome to wonderlust!');
      res.redirect('/listings');
    }catch(err){
      req.flash('error' , err.message)
      res.redirect('/signup');
    }
}
));


router.get('/login',(req , res) => {
  res.render('users/login.ejs');
})


router.post('/login' ,
  passport.authenticate('local' ,
    {failureRedirect : '/login' , failureFlash: true}),
  async (req,res) => {
    req.flash('success','Login successful');
    res.redirect('/listings');
})


module.exports = router;
