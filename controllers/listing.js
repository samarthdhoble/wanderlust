const Listing = require('../models/listing.js')

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
  console.log('all listings fetched');
}


module.exports.renderNewForm = (req, res) => {
  res.render('listings/new.ejs');
}


module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({path: 'reviews',
    populate :{
      path:'author',
  }})
  .populate('owner');
  if (!listing) {
    req.flash('error', 'Listing you are looking for does not exist');
    return res.redirect('/listings');
  }
  res.render('listings/show.ejs', { listing });
}


module.exports.createListing = async (req, res) => {
  const { listing } = req.body;

  if (listing.image && listing.image.url === '') {
    delete listing.image.url;
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash('success', 'New listing created');
  res.redirect('/listings');
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    return res.redirect('/listings');
  }
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash('error', 'You do not have permission to edit this listing');
    return res.redirect(`/listings/${id}`);
  }
  res.render('listings/edit.ejs', { listing });
}


module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash('success', 'Listing updated');
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash('success', 'Listing deleted');
  res.redirect('/listings');
}