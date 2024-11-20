const express = require('express');                 // Importing Express package
const { createUser, getUsers, getUserById } = require('../controllers/signupController');

// Importing all the created Functions and completion of API with HTTP Methods

const router = express.Router();                // With the common name using Router

router.post('/signup', createUser);
router.get('/signup', getUsers);

module.exports = router;