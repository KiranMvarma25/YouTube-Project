const express = require('express');
const { createUser, getUsers, getUserById } = require('../controllers/signupController');

const router = express.Router();

router.post('/signup', createUser);
router.get('/signup', getUsers);

module.exports = router;