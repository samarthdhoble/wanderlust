const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/Listing.js');


// Mongo DB connection
const MONGOURL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(async() => {
  console.log('Connected to MongoDB');
  
  await intiDB();
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
})

async function main(){
  await mongoose.connect(MONGOURL); 
}

const intiDB = async () => {
  await Listing.deleteMany({});

  await Listing.insertMany(initdata.data);
  console.log('Data Imported');
};

