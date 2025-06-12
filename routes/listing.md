const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { isLoggedIn } = require('../middleware.js');


// MIDDLEWARE TO VALIDATE LISTING DATA ->
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => {
      // Extract field name and customize message
      const field = el.path.join('.');
      const message = el.message.replace(`"${field}"`, field.split('.').pop());
      return message;
    }).join(', ');
    
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
// console.log(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(', ');
    
//     throw new ExpressError(400, error);
//   } else {
//     next();
//   }
// };



// create listing
router.post('/' ,
  isLoggedIn,
  validateListing, // Validate the request body before creating a listing 
  wrapAsync(async (req,res) => {
    const { listing } = req.body;

    if (listing.image && listing.image.url === '') {
      delete listing.image.url;
    }

    let newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success' , 'New listing created')
    res.redirect(`/listings`); 
  })
);


// create listing Form 
router.get('/new' , isLoggedIn , (req , res) => {
    res.render('listings/new.ejs');

})

// show listing  
router.get('/:id',
  wrapAsync( async (req , res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate('reviews').populate('owner');
     if (!listing) {
      req.flash('error', 'Listing you are looking for does not exist');
      res.redirect('/listings');
     }
    //  console.log(listing)
      res.render('listings/show.ejs' , {listing});
    
  })
);



// edit listing
router.get('/:id/edit' ,
  validateListing, // Validate the request body before editing a listing 
  isLoggedIn,
  wrapAsync(async (req , res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id)
    res.render('listings/edit.ejs' , {listing});
  })
);


// final EDIT route
router.put('/:id' , 
  isLoggedIn,
  wrapAsync(async (req,res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid listing data");
    }
    let {id}= req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash('error' , 'you dont have permission to edit');
      return res.redirect(`listings/${listing.id}`);
    }
    await Listing.findByIdAndUpdate(id ,{...req.body.listing});
    req.flash('success' , 'listing updated')  
    res.redirect(`/listings/${id}`);
  })
);

// delete listing
router.delete('/:id' , 
  isLoggedIn,
  wrapAsync(async (req,res) => {

    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); 
    req.flash('success' , 'listing deleted')
    res.redirect('/listings');
  })
);


 
// list all listings
router.get('/' , 
  wrapAsync(async (req , res ) => {
    let allListings = await Listing.find({});
    res.render('listings/index.ejs' , {allListings});
    console.log('all listings fetched');
  })
);


module.exports = router;
