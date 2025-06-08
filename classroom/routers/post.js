
const express = require('express');
const { route } = require('./user');
const router = express.Router();




router.get('/', (req, res) => {
  res.send('All posts');
});


router.get('/created', (req, res) => {
  res.send('Post created');
});


router.get('/:id', (req, res) => {
  res.send('Post updated');
});


router.post('/', (req, res) => {
  res.send('Post deleted');
});


module.exports = router;
