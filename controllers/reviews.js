const Listing = require('../models/listing.js')
const Review = require('../models/review.js')



module.exports.createReview = async (req , res) => {
  let listing = await Listing.findById(req.params.id)
  let newReview = new Review(req.body.review)// 
  newReview.author = req.user._id;
  
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log('review added');
  req.flash('success' , 'New Review created')
  res.redirect(`/listings/${listing._id}`);

}

module.exports.destroyReview = async (req , res) => {
  let {id , reviewId} = req.params;
  await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
  req.flash('success' , 'Review deleted ')
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);

}