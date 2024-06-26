const express = require("express");
const User = require("../controller/user");

const router = express.Router();

router.post("/register", User.register);
router.post("/login", User.login);

module.exports = router;
