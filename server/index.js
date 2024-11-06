// This is a Node.js example using Express and the Stripe Node.js library
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fs = require('fs');

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use("/api", require("./routes/googleOauth"));
app.use("/api", require("./routes/create-user"));
app.use("/api", require("./routes/getUser"));
app.use("/api", require("./routes/donate"));
app.use("/api", require("./routes/stripePayment"));
// Function to validate email address
app.use(bodyParser.json());

app.post("/api/add-project", async (req, res) => {
  const { projectName, organization, mission, description, focusAreas } = req.body;

  if (!req.files || !req.files.image) {
    return res.status(400).send("No image file was uploaded.");
  }

  const image = req.files.image;

  // Define the path to store the uploaded image
  const uploadPath = path.join(__dirname, 'uploads', image.name);

  try {
    // Move the uploaded file to the uploads directory
    await image.mv(uploadPath);

    // Create the image URL (assuming you're serving files statically from 'uploads' folder)
    const imageUrl = `/uploads/${image.name}`;

    // Save the project data to the database, including the imageUrl
    const project = await prisma.project.create({
      data: {
        projectName,
        organization,
        mission,
        description: JSON.stringify({ description, focusAreas }), // Store description and focusAreas as a JSON string
        imageUrl, // Store the image URL
      },
    });

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading image or saving project data.");
  }
});

app.get("/api/projects", async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});
app.get("/featured-project", async (req, res) => {
  const id = 1;
  const project = await prisma.project.findUnique({
    where: { id },
  });
  res.json(project);
});
app.patch("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { projectName, organization, mission, description, focusAreas } =
    req.body;
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        projectName,
        organization,
        mission,
        description: JSON.stringify({ description, focusAreas }),
      },
    });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
    });

    if (project) {
      const { description, focusAreas } = JSON.parse(project.description);
      project.description = description;
      project.focusAreas = focusAreas;
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (err) {
    console.error("Error parsing project data", err);
    res.status(500).json({ error: "Failed to parse project data" });
  }
});

app.delete("/api/all-projects", async (req, res) => {
  try {
    await prisma.project.deleteMany();
    res.json({ message: "All projects deleted" });
  } catch (error) {
    console.error(error);
    res
  }
});



const PORT = process.env.PORT || 2000; // Change to a different port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));