const express = require('express');             // Importing Express package
const { loginUser } = require('../controllers/loginController');
const { auth } = require('../middleware/auth');

// Importing all the created Functions and completion of API with HTTP Methods

const signuprouter = express.Router();          // With the common name using Router

// signuprouter.post('/login',loginUser);
signuprouter.post('/loginwithauth', loginUser, auth, (req,resp) => {
    resp.status(200).json({
        success : true,
        msg : "Welcome",
    });
});

module.exports = signuprouter;