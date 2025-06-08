
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

