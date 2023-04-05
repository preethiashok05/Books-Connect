const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.delete('/book/:bookname/:author', deleteController.removeBook);

module.exports = router;