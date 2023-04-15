const express = require('express');
const router = express.Router();
const deleteController = require('../controllers/deleteController');

router.delete('/recieved/:book_id/:collected/:r_mail', deleteController.removeBook);

module.exports = router;