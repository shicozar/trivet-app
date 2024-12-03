const express = require("express")
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const { login } = require("../Controllers/auth");
const { validateUserLogin } = require("../middlewares/validateUserLogin");

router.post("/login", validateUserLogin, catchAsync(login));

module.exports = router;