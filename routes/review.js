const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');


// MIDDLEWARE TO VALIDATE REVIEW DATA ->
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => {
      // Extract field name and customize message
      const field = el.path.join('.');
      const message = el.message.replace(`"${field}"`, field.split('.').pop());
      return message;
    }).join(', ');
    console.log(error);
    
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


// add review to listing ->
router.post('/', validateReview , wrapAsync(async (req , res) => {
  let listing = await Listing.findById(req.params.id)
  let newReview = new Review(req.body.review)// 

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log('review added');
   req.flash('success' , 'New Review created')
  res.redirect(`/listings/${listing._id}`);

}));


// delete review from listing
router.delete('/:reviewId',
  wrapAsync( async (req , res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    req.flash('success' , 'Review deleted ')
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);

  }))


module.exports = router;