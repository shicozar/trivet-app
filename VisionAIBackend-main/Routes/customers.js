const express = require("express")
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const { signup, getAllCustomer } = require("../Controllers/customers");
const { validateUserRegister } = require("../middlewares/validateUserRegister");

router.post("/signup", validateUserRegister, catchAsync(signup));

router.get("/", getAllCustomer);

router.get("/", (req, res) => {
    res.send("I am here")
})

module.exports = router;