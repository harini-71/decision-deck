const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    options: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    criteria: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        weight: {
          type: Number,
          required: true,
          min: 1,
          max: 10,
        },
      },
    ],

    evaluations: [
      {
        option: {
          type: String,
          required: true,
        },

        scores: [
          {
            criterion: {
              type: String,
              required: true,
            },

            score: {
              type: Number,
              required: true,
              min: 1,
              max: 10,
            },
          },
        ],
      },
    ],

    result: {
      winner: {
        type: String,
        default: null,
      },

      rankings: [
        {
          option: String,
          score: Number,
        },
      ],
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Decision", decisionSchema);