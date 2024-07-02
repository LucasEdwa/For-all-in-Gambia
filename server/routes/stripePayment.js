const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Route to create payment intent
router.post("/create-payment-intent", async (req, res) => {
  const {
    paymentMethodId,
    donationAmount,
    email,
    mobileNumber,
    fullName = "",
    companyFirstName = "",
    companyLastName = "",
    companyPhoneNumber,
    personalNumber,
    checkedForTaxReduction,
    organizationNumber,
    userId,
    donationId,
  } = req.body;

  if (isNaN(donationAmount) || donationAmount <= 0) {
    return res.status(400).json({ error: "Invalid donation amount" });
  }

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(donationAmount * 100),
      currency: "sek",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "http://localhost:3000/return", // Replace with your return URL
      metadata: {
        email,
        mobileNumber,
        personalNumber,
        companyPhoneNumber,
        organizationNumber,
        userId,
        name: `${companyFirstName} ${companyLastName}`.trim() || fullName,
        taxReduction: checkedForTaxReduction ? "Yes" : "No",
        donationId,
      },
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe Webhook endpoint to handle events
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook Error:", err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const { userId, donationId } = paymentIntent.metadata;

      try {
        await prisma.userPaymentData.create({
          data: {
            userId: parseInt(userId, 10),
            donateId: parseInt(donationId, 10),
          },
        });
      } catch (err) {
        console.error("Error creating UserPaymentData:", err);
        return res.status(500).send("Internal Server Error");
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;
