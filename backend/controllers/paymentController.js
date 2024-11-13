// controllers/paymentController.js
const paymentModel = require("../models/paymentModel");

exports.startPayment = (req, res) => {
  const { order_id, amount, currency } = req.body;
  console.log("Payment request for order:", order_id);

  const hash = paymentModel.generateHash(order_id, amount, currency);
  console.log("Hash generated for order:", order_id);

  res.json({ hash, merchant_id: paymentModel.merchant_id });
};

exports.notifyPayment = (req, res) => {
  console.log("Payment notification received");

  const { merchant_id, order_id, status_code } = req.body;
  const isVerified = paymentModel.verifyHash(req.body, paymentModel.merchant_secret);

  if (isVerified) {
    if (status_code === "2") {
      console.log("Payment successful for order:", order_id);
      res.sendStatus(200);
    } else if (status_code === "0") {
      console.log("Payment failed or unknown status for order:", order_id);
      res.sendStatus(200);
    }
  } else {
    console.log("Payment verification failed for order:", order_id);
    res.sendStatus(400);
  }
};
