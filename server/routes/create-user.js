const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

const prisma = new PrismaClient();
const schema = new passwordValidator();

//  Authentification

router.post("/sign-up", async (req, res) => {
  const { email, password, firstName, lastName, marketing_accept } = req.body;

  // Check for missing fields
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ error: "Missing some of the required fields" });
  }

  // Validate email
  const emailValid = emailValidator.validate(email);
  if (!emailValid) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Password rules setup (Assuming you have this configured)
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  // Validate password
  const passwordValid = schema.validate(password);
  if (!passwordValid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  // Validate first name
  if (firstName.length < 3) {
    return res.status(400).json({ error: "Invalid first name" });
  }

  // Validate last name
  if (lastName.length < 3) {
    return res.status(400).json({ error: "Invalid last name" });
  }

  // Check if email already exists
  const emailExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (emailExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  // Create user
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        marketingAccept: marketing_accept === true ? true : false,
      },
    });
    res.json({ message: "User created successfully, email: " + user.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to create user" });
  }
});
router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found with provided email." });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }
    const tokenPayload = { userId: user.id, role: user.role }; // Ensure 'role' is included if you use it for authorization checks
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: _, ...userData } = user; // Exclude password from the user data
    res.json({
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred during the sign-in process." });
  }
});

module.exports = router;
