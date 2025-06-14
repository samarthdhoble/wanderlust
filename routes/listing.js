const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner , validateListing } = require('../middleware.js');
const listingControllers = require('../controllers/listing.js');
const multer  = require('multer')
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })




// Show form to create listing
router.get('/new', 
  isLoggedIn, 
  listingControllers.renderNewForm
);


// Create listing & Show all listings

router.route('/')
  .get(wrapAsync(listingControllers.index))               // Show all listings
  .post(
    isLoggedIn,
    // validateListing,
    upload.single('listing[image][url]'),
    wrapAsync(listingControllers.createListing)           // Create new listing
  );


// =======================
// Single Listing Routes
// =======================

router.route('/:id')
  .get(wrapAsync(listingControllers.showListing))         // Show single listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingControllers.updateListing)           // Update listing
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingControllers.destroyListing)          // Delete listing
  );


// Show edit form
router.get('/:id/edit',
  isLoggedIn,
  wrapAsync(listingControllers.renderEditForm)
);


module.exports = router;
