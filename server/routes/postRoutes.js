const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')


//post a book
router.post('/addbook', postController.addbook);

//authentication 

router.post('/signup', postController.signup);
router.post('/signin', postController.signin);

module.exports = router;