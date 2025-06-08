const express = require('express');
const { model } = require('mongoose');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('All users');
});

router.post('/:id/yes', (req, res) => {
  res.send('User created');
});

router.put('/:id', (req, res) => {
  res.send('User updated');
});

router.get('/:id', (req, res) => {
  res.send('User deleted');
});


module.exports = router;

