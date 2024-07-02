const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { PrismaClient } = require("@prisma/client");

const YOUR_CLIENT_ID = process.env.YOUR_CLIENT;
const YOUR_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET;
const YOUR_REDIRECT_URL = process.env.YOUR_REDIRECT_URL;
const JWT_SECRET = process.env.JWT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

const prisma = new PrismaClient();

router.get("/auth/google", (req, res) => {
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const people = google.people({ version: "v1", auth: oauth2Client });
  const me = await people.people.get({
    resourceName: "people/me",
    personFields: "emailAddresses,names",
  });

  const myInfo = me.data;
  const jwtToken = jwt.sign(myInfo, JWT_SECRET);

  // Create a user in the database using Prisma
  const user = await prisma.user.create({
    data: {
      email: myInfo.emailAddresses[0].value,
      name: myInfo.names[0].displayName,
      googleId: myInfo.resourceName.split("/")[1],
    },
  });

  res.send(jwtToken);
});

module.exports = router;
