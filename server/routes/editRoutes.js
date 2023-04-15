const express = require('express');
const router = express.Router();
const editController  = require('../controllers/editController'); 

router.put('/opinion/:book_id/:agree/:r_mail', editController.disable);

module.exports = router;