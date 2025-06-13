const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner , validateListing } = require('../middleware.js');
const listingControllers = require('../controllers/listing.js');




// =======================
// Create Listing Routes
// =======================

// Show form to create listing
router.get('/new', 
  isLoggedIn, 
  listingControllers.renderNewForm
);


// Create listing (POST)
router.post('/',
  isLoggedIn,
  validateListing,
  wrapAsync(listingControllers.createListing)
);

// =======================
// Read Listings
// =======================

// Show all listings // Index Route
router.get('/',
  wrapAsync(listingControllers.index)
);

// Show single listing
router.get('/:id',
  wrapAsync(listingControllers.showListing)
);

// =======================
// Update Listing Routes
// =======================

// Show edit form
router.get('/:id/edit',
  isLoggedIn,
  wrapAsync(listingControllers.renderEditForm)
);

// Handle edit submission (PUT)
router.put('/:id',
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingControllers.updateListing)
);


// =======================
// Delete Listing Route
// =======================

router.delete('/:id',
  isLoggedIn,
  isOwner, // ✅ this handles permission check
  wrapAsync(listingControllers.destroyListing)
);

module.exports = router;
