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
  initdata.data = initdata.data.map((obj) => ({...obj , owner :'684953e8d92dbd545aed053d'}))
  await Listing.insertMany(initdata.data);
  console.log('Data Imported');
};

