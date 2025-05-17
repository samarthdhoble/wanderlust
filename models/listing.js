const mongoose = require('mongoose');
const { Schema } = mongoose;


const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,  // Make sure this is included!
  },
  price: Number,
  location: String,
  country: String,
});


const Listing = mongoose.model('Listing' , listingSchema);

module.exports = Listing;