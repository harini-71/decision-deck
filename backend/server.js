const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const decisionRoutes = require("./routes/decisionRoutes");
const cors = require("cors");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/decisions", decisionRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Decision Deck backend is running",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });