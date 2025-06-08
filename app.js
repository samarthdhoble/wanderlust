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
const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/review.js');


// Middleware
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




app.get('/' , (req , res) => {
  res.send('all working fine!!')
})

// Routes
app.use('/listings', listingRoutes);
app.use('/listings/:id/reviews', reviewRoutes)
  

 


// At the very end of all routes ERROR HANDLING
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
 
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // This will log the full error stack trace
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { statusCode, message });
});






// server listening
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})