const express = require('express');
const router = express.Router();
const getController = require('../controllers/getController');

router.get('/book/:category/:subcategory/:field/:subject/:filter/:order', getController.getBooks);

module.exports = router;