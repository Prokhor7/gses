const express = require("express");
const { getRate } = require("../controllers/rateController");

const router = express.Router();

router.get("/rate", getRate);

module.exports = router;
