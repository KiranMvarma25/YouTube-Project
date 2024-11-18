const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');

let router = express.Router();

router.post('/addcomment', addComment);
router.get('/getcomments', getComments);

module.exports = router;