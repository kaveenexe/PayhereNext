const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this if your frontend is hosted elsewhere
  })
);

// Set CSP headers
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://sandbox.payhere.lk"],
        connectSrc: ["'self'", "https://sandbox.payhere.lk"],
      },
      reportOnly: true, // Enable this as 'true' initially for testing to ensure there are no security issues.
    })
  );

// Set up routes
app.use("/payment", paymentRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});