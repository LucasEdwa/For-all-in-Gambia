const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/current-user", verifyToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  } else {
    res.send({ user: user });
  }
});
module.exports = router;
