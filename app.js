const express = require('express');
const mongoose = require('mongoose');
port = 3000;
const app = express();
const Listing = require('./models/listing.js');



// Mongo DB connection
const MONGOURL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
})

async function main(){
  await mongoose.connect(MONGOURL); 
}



app.get('/testListing' , async (req ,res) => {
  let sampleListing = new Listing({
    title : 'sample title',
    description : 'sample description',

    price : 100,
    location : 'sample location',
    country : 'sample country'
  });

  await sampleListing.save()
  res.send('sample listing created');
  console.log('sample listing created');
})

app.get('/' , (req , res) => {
  res.send('all working fine!!')
})

// server listening
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})