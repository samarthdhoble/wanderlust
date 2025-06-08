const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review.js');

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    url: {
      type: String,
      default: 'https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg'
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  reviews : [{
    type : Schema.Types.ObjectId,
    ref : 'Review'
  }]

});

// MIDDLEWARE A LISTING IS DELETED, DELETE ALL REVIEWS ASSOCIATED WITH IT
listingSchema.post('findOneAndDelete',async ( listing ) => { 
  if(listing){
     await Review.deleteMany({ _id  : {$in : listing.reviews}});
  }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
