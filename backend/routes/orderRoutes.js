/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Order = require("../models/Order");

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id).populate(
      "customer",
      "name email phone"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
});

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const {
      customer,
      customerName,
      customerEmail,
      customerPhone,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
      status,
    } = req.body;

    if (!customer || !customerName || totalAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Customer, customer name and total amount are required",
      });
    }

    const order = await Order.create({
      customer,
      customerName,
      customerEmail,
      customerPhone,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
      status,
    });

    const populatedOrder = await Order.findById(order._id).populate(
      "customer",
      "name email phone"
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

// UPDATE ORDER
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
});

// UPDATE ORDER STATUS ONLY
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer", "name email phone");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
});

module.exports = router;