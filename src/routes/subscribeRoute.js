const express = require("express");
const { addSubscriber } = require("../controllers/subscribeController");

const router = express.Router();

router.post("/subscribe", addSubscriber);

module.exports = router;
