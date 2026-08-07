/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Keep the original frontend ID so we can match old menu items.
    legacyId: {
      type: Number,
      unique: true,
      sparse: true,
    },

    restaurantId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    image: {
      type: String,
      default: "",
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);