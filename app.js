const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
port = 3000;
const app = express();
const path = require('path');
const Listing = require('./models/listing.js');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');


app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs' , ejsMate);



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





// MIDDLEWARE TO VALIDATE LISTING DATA ->

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);

//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(', ');
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };



// MIDDLEWARE TO VALIDATE LISTING DATA ->

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => {
      // Extract field name and customize message
      const field = el.path.join('.');
      const message = el.message.replace(`"${field}"`, field.split('.').pop());
      return message;
    }).join(', ');
    
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => {
      // Extract field name and customize message
      const field = el.path.join('.');
      const message = el.message.replace(`"${field}"`, field.split('.').pop());
      return message;
    }).join(', ');
    
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};





// create listing
app.post('/listings' ,
  validateListing, // Validate the request body before creating a listing 
  wrapAsync(async (req,res) => {
    let newListing = new Listing(req.body.listing)
    await newListing.save();
    res.redirect(`/listings`); 
  })
);


// create listing
app.get('/listings/new' , (req , res) => {
  res.render('listings/new.ejs');
})



// show listing  
app.get('/listings/:id',
  wrapAsync( async (req , res) => {
  
    let id = req.params.id;
    const listing = await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs' , {listing});
  })
);


// edit listing
app.get('/listings/:id/edit' ,
  validateListing, // Validate the request body before editing a listing 
  wrapAsync(async (req , res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id)
    res.render('listings/edit.ejs' , {listing});
  })
);


// final EDIT route
app.put('/listings/:id' , 
  wrapAsync(async (req,res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid listing data");
    }
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id ,{...req.body.listing});
    res.redirect(`/listings/${id}`);
  })
);

// delete listing
app.delete('/listings/:id' , 
  wrapAsync(async (req,res) => {

    let {id}= req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); 
    // console.log('listing deleted' ,deletedListing);
    res.redirect('/listings');
  })
);




app.post('/listings/:id/reviews', validateReview , wrapAsync(async (req , res) => {
  let listing = await Listing.findById(req.params.id)
  let newReview = new Review(req.body.review)// 

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log('review added');
  res.redirect(`/listings/${listing._id}`);

}));


// list all listings
app.get('/listings' , 
  wrapAsync(async (req , res ) => {
    let allListings = await Listing.find({});
    res.render('listings/index.ejs' , {allListings});
    console.log('all listings fetched');
  })
);


// At the very end of all routes ERROR HANDLING
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
 

app.use((err, req, res, next) => {
  console.error(err.stack); // This will log the full error stack trace
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { statusCode, message });
});





app.get('/' , (req , res) => {
  res.send('all working fine!!')
})

// server listening
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})