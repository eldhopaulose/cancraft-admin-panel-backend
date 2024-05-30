var express = require('express');
var router = express.Router();
var adminController = require('../controller/adminController');

router.post('/login', adminController.adminLogin);
router.post('/register', adminController.adminRegister); // Add register route

module.exports = router;
