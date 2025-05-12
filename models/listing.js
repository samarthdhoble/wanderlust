const mongoose = require('mongoose');
const { Schema } = mongoose;



const listeingSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String
  },
  url : {
    type : String,
    default : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg',
    set : (v) => v === '' ? 'https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg' : v
  },
  price: {
    type : Number
  },
  location : {
    type : String
  },
  country : {
    type : String
  }
});


const Listing = mongoose.model('Listing' , listeingSchema);

module.exports = Listing;