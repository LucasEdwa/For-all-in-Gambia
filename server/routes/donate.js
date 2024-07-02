const express = require("express");
const { PrismaClient } = require("@prisma/client");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const validateEmail = (email) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  );

const createPaymentIntent = async (
  donationAmount,
  paymentMethodId,
  email,
  mobileNumber,
  personalNumber,
  companyPhoneNumber,
  fullName,
  companyFirstName,
  companyLastName,
  checkedForTaxReduction
) => {
  return await stripe.paymentIntents.create({
    amount: Math.round(donationAmount * 100),
    currency: "sek",
    payment_method: paymentMethodId,
    confirm: true,
    return_url: process.env.RETURN_URL,
    metadata: {
      email,
      mobileNumber,
      personalNumber,
      companyPhoneNumber,
      name:
        companyFirstName && companyLastName
          ? `${companyFirstName} ${companyLastName}`
          : fullName,
      taxReduction: checkedForTaxReduction ? "Yes" : "No",
    },
    payment_method_options: {
      card: {
        request_three_d_secure: "any",
      },
    },
  });
};

const createUserPaymentData = async (userId, donationId) => {
  return await prisma.userPaymentData.create({
    data: {
      userId: parseInt(userId, 10),
      donateId: donationId,
    },
  });
};

const createDonation = async (
  donationAmount,
  userId,
  companyFirstName,
  signatureType,
  companyLastName,
  email,
  mobileNumber,
  donationType,
  personalNumber,
  fullName,
  companyEmail,
  companyPhoneNumber,
  companyRegistrationNumber,
  checkedForTaxReduction
) => {
  return await prisma.donate.create({
    data: {
      amount: donationAmount,
      currency: "SEK",
      userId: parseInt(userId, 10),
      companyFirstName: companyFirstName || "",
      signatureType,
      companyLastName: companyLastName || "",
      email,
      mobileNumber,
      donationType,
      personalNumber: personalNumber || "",
      fullName,
      companyEmail: companyEmail || "",
      companyPhoneNumber: companyPhoneNumber || "",
      companyRegistrationNumber: companyRegistrationNumber || "",
      checkedForTaxReduction: !!checkedForTaxReduction,
      date: new Date(),
    },
  });
};

router.post("/donate", verifyToken, async (req, res) => {
  const {
    donationType,
    signatureType,
    donationAmount,
    fullName,
    email,
    mobileNumber,
    personalNumber,
    checkedForTaxReduction,
    companyFirstName,
    companyLastName,
    companyRegistrationNumber,
    companyEmail,
    companyPhoneNumber,
    paymentMethodId,
  } = req.body;
  const userId = req.userId;

  // Validate required fields
  if (
    !donationType ||
    !signatureType ||
    isNaN(donationAmount) ||
    donationAmount <= 0 ||
    !fullName ||
    !email ||
    !validateEmail(email) ||
    !paymentMethodId
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const paymentIntent = await createPaymentIntent(
      donationAmount,
      paymentMethodId,
      email,
      mobileNumber,
      personalNumber,
      companyPhoneNumber,
      fullName,
      companyFirstName,
      companyLastName,
      checkedForTaxReduction
    );

    if (
      paymentIntent.status === "requires_action" ||
      paymentIntent.status === "requires_source_action"
    ) {
      return res.status(200).json({
        requiresAction: true,
        paymentIntentClientSecret: paymentIntent.client_secret,
      });
    } else if (paymentIntent.status === "succeeded") {
      // Fetch the user for logging
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create Donation
      const donation = await createDonation(
        donationAmount,
        userId,
        companyFirstName,
        signatureType,
        companyLastName,
        email,
        mobileNumber,
        donationType,
        personalNumber,
        fullName,
        companyEmail,
        companyPhoneNumber,
        companyRegistrationNumber,
        checkedForTaxReduction
      );

      // Create UserPaymentData and link it to the Donation
      const userPaymentData = await createUserPaymentData(userId, donation.id);
      return res.status(201).json({ donation, paymentIntent });
    } else {
      return res.status(500).json({ error: "Failed to confirm payment" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
