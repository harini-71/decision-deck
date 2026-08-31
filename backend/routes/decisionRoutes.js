
const express = require("express");
const Decision = require("../models/Decision");

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const decision = await Decision.create(req.body);

    res.status(201).json({
      success: true,
      decision,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const decisions = await Decision.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      decisions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id);

    if (!decision) {
      return res.status(404).json({
        success: false,
        message: "Decision not found",
      });
    }

    res.json({
      success: true,
      decision,
    });
  } catch (error) {
    console.error("GET ONE DECISION ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedDecision = await Decision.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDecision) {
      return res.status(404).json({
        success: false,
        message: "Decision not found",
      });
    }

    res.json({
      success: true,
      decision: updatedDecision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedDecision = await Decision.findByIdAndDelete(
      req.params.id
    );

    if (!deletedDecision) {
      return res.status(404).json({
        success: false,
        message: "Decision not found",
      });
    }

    res.json({
      success: true,
      message: "Decision deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;