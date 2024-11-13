// models/paymentModel.js
const crypto = require("crypto");
require("dotenv").config();

const { MERCHANT_ID, MERCHANT_SECRET } = process.env;

module.exports = {
  merchant_id: MERCHANT_ID,
  merchant_secret: MERCHANT_SECRET,

  generateHash(orderId, amount, currency) {
    return crypto
      .createHash("md5")
      .update(
        MERCHANT_ID +
          orderId +
          amount +
          currency +
          crypto.createHash("md5").update(MERCHANT_SECRET).digest("hex").toUpperCase()
      )
      .digest("hex")
      .toUpperCase();
  },

  verifyHash(data, merchantSecret) {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = data;

    const local_md5sig = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          crypto.createHash("md5").update(merchantSecret).digest("hex").toUpperCase()
      )
      .digest("hex")
      .toUpperCase();

    return local_md5sig === md5sig && status_code === "2";
  }
};
