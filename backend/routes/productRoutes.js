/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({
      available: true,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// GET ALL PRODUCTS FOR ADMIN
router.get("/admin/all", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("ADMIN PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin products",
      error: error.message,
    });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// CREATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      rating,
      category,
      restaurantId,
      image,
      available,
    } = req.body;

    if (
      !name ||
      price === undefined ||
      !category ||
      restaurantId === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, price, category and restaurantId are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      rating,
      category,
      restaurantId,
      image,
      available:
        available === undefined ? true : available,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;