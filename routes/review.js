const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner , validateListing , validateReview , isReviewAuthor} = require('../middleware.js');
const reviewcontroller = require('../controllers/reviews.js');




// add review to listing ->
router.post('/',
  isLoggedIn,
  validateReview , 
  wrapAsync(reviewcontroller.createReview)
);


// delete review from listing
router.delete('/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewcontroller.destroyReview)
);


module.exports = router;