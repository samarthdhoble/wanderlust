const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner , validateListing } = require('../middleware.js');




// =======================
// Create Listing Routes
// =======================

// Show form to create listing
router.get('/new', isLoggedIn, (req, res) => {
  res.render('listings/new.ejs');
});

// Create listing (POST)
router.post('/',
  isLoggedIn,
  
  validateListing,
  wrapAsync(async (req, res) => {
    const { listing } = req.body;

    if (listing.image && listing.image.url === '') {
      delete listing.image.url;
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'New listing created');
    res.redirect('/listings');
  })
);

// =======================
// Read Listings
// =======================

// Show all listings
router.get('/',
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
    console.log('all listings fetched');
  })
);

// Show single listing
router.get('/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews').populate('owner');
    if (!listing) {
      req.flash('error', 'Listing you are looking for does not exist');
      return res.redirect('/listings');
    }
    res.render('listings/show.ejs', { listing });
  })
);

// =======================
// Update Listing Routes
// =======================

// Show edit form
router.get('/:id/edit',
  isLoggedIn,
  wrapAsync(async (req, res) => {
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
  })
);

// Handle edit submission (PUT)
router.put('/:id',
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', 'Listing updated');
    res.redirect(`/listings/${id}`);
  })
);

// =======================
// Delete Listing Route
// =======================

router.delete('/:id',
  isLoggedIn,
  isOwner, // ✅ this handles permission check
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted');
    res.redirect('/listings');
  })
);

module.exports = router;
