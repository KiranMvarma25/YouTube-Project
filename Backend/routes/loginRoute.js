const express = require('express');
const { loginUser } = require('../controllers/loginController');
const { auth } = require('../middleware/auth');

const signuprouter = express.Router();

// signuprouter.post('/login',loginUser);
signuprouter.post('/loginwithauth', loginUser, auth, (req,resp) => {
    resp.status(200).json({
        success : true,
        msg : "Welcome",
    });
});

module.exports = signuprouter;