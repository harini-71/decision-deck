
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { decision } = req.body || {};

    if (!decision) {
      return res.status(400).json({
        message: "Decision data is required.",
      });
    }

    const results = decision.result?.rankings || [];

    if (results.length === 0) {
      return res.status(400).json({
        message: "Decision results are required.",
      });
    }

    const winner = results[0];
    const runnerUp = results[1];

    const scoreDifference = runnerUp
      ? winner.score - runnerUp.score
      : 0;

    let confidence;
    let insight;

    if (scoreDifference >= 15) {
      confidence = "Strong";

      insight = `${winner.option} is the clear front-runner, finishing ${scoreDifference.toFixed(
        1
      )} points ahead of the next option. Your criterias strongly favor this choice.`;
    } else if (scoreDifference >= 7) {
      confidence = "Moderate";

      insight = `${winner.option} comes out on top, but the decision isn't overwhelming. It leads the next option by ${scoreDifference.toFixed(
        1
      )} points.`;
    } else {
      confidence = "Close";

      insight = `${winner.option} comes out on top, but this is a close decision. The top options are separated by only ${scoreDifference.toFixed(
        1
      )} points, so your priorities could easily change the outcome.`;
    }

    res.json({
      success: true,
      advisor: {
        winner: winner.option,
        confidence,
        insight,
      },
    });
  } catch (error) {
    console.error("Advisor error:", error);

    res.status(500).json({
      message: "Unable to generate decision insight.",
    });
  }
});

module.exports = router;

