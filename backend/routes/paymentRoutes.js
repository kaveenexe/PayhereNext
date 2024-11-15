// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/start", paymentController.startPayment);
router.post("/notify", paymentController.notifyPayment);

module.exports = router;
