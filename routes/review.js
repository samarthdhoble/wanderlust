const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner , validateListing , validateReview , isReviewAuthor} = require('../middleware.js');





// add review to listing ->
router.post('/',
  isLoggedIn,
  validateReview , 
  wrapAsync(async (req , res) => {
  let listing = await Listing.findById(req.params.id)
  let newReview = new Review(req.body.review)// 
  newReview.author = req.user._id;
  
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log('review added');
   req.flash('success' , 'New Review created')
  res.redirect(`/listings/${listing._id}`);

}));


// delete review from listing
router.delete('/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  wrapAsync( async (req , res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
    req.flash('success' , 'Review deleted ')
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);

  }))


module.exports = router;