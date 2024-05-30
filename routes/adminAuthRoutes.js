var express = require("express");
var router = express.Router();

const { adminLogin, adminRegister } = require("../controller/adminController");

router.post("/login", adminLogin);
router.post("/register", adminRegister); // Add register route

module.exports = router;
