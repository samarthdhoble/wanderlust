const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
port = 3000;
const app = express();
const path = require('path');
const Listing = require('./models/listing.js');

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));


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



// app.get('/testListing' , async (req ,res) => {
//   let sampleListing = new Listing({
//     title : 'sample title',
//     description : 'sample description',

//     price : 100,
//     location : 'sample location',
//     country : 'sample country'
//   });

//   await sampleListing.save()
//   res.send('sample listing created');
//   console.log('sample listing created');
// })



// create listing
app.get('/listings/new' , (req , res) => {
  res.render('listings/new.ejs');
})

// show listing  
app.get('/listings/:id', async (req , res) => {
  
  let id = req.params.id;
  const listing = await Listing.findById(id)
  res.render('listings/show.ejs' , {listing});
})


// create listing
app.post('/listings' , async (req,res) => {
  let newListing = new Listing(req.body.listing)
  await newListing.save();
  res.redirect(`/listings`);

})

// edit listing
app.get('/listings/:id/edit' , async (req , res) => {
  let id = req.params.id;
  const listing = await Listing.findById(id)
  res.render('listings/edit.ejs' , {listing});
})


// final EDIT route
app.put('/listings/:id' , async (req,res) => {
  let {id}= req.params;
  await Listing.findByIdAndUpdate(id ,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})


app.get('/listings',async (req , res ) => {
  let allListings = await Listing.find({});
  res.render('listings/index.ejs' , {allListings});
  console.log('all listings fetched');

})





app.get('/' , (req , res) => {
  res.send('all working fine!!')
})

// server listening
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})