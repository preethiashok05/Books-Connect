const express = require('express');
const router = express.Router();
const editController  = require('../controllers/editController');

//books belonging to specific categories 

router.put('/book/:bookname/:author', editController.reducecount);

module.exports = router;