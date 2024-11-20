const express = require('express');             // Importing Express package
const { addComment, getComments } = require('../controllers/commentController');

// Importing all the created Functions and completion of API with HTTP Methods

let router = express.Router();          // With the common name using Router

router.post('/addcomment', addComment);
router.get('/getcomments', getComments);

module.exports = router;