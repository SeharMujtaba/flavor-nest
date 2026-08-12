/* eslint-disable @typescript-eslint/no-require-imports */

const mongoose = require("mongoose");
const Order = require("../models/Order");

// ==============================
// GET ALL ORDERS
// ==============================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ==============================
// GET SINGLE ORDER
// ==============================

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(id).populate(
      "customer",
      "name email phone"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// ==============================
// CREATE ORDER
// GUEST CHECKOUT SUPPORTED
// ==============================

const createOrder = async (req, res) => {
  try {
    console.log("=================================");
    console.log("CREATE ORDER REQUEST");
    console.log("BODY:", JSON.stringify(req.body, null, 2));
    console.log("=================================");

    const {
      customer,
      customerName,
      customerEmail,
      customerPhone,
      restaurant,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      status,
    } = req.body;

    // ==============================
    // CUSTOMER
    // ==============================

    let validCustomer = null;

    if (
      customer !== undefined &&
      customer !== null &&
      customer !== ""
    ) {
      if (!mongoose.Types.ObjectId.isValid(customer)) {
        return res.status(400).json({
          success: false,
          message: "Invalid customer ID",
        });
      }

      validCustomer = customer;
    }

    // ==============================
    // CUSTOMER NAME
    // ==============================

    if (
      typeof customerName !== "string" ||
      !customerName.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required",
      });
    }

    // ==============================
    // ITEMS
    // ==============================

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one order item is required",
      });
    }

    // ==============================
    // CLEAN + VALIDATE ITEMS
    // ==============================

    const cleanedItems = [];

    for (const item of items) {
      if (!item || typeof item !== "object") {
        return res.status(400).json({
          success: false,
          message: "Invalid order item",
        });
      }

      const name =
        typeof item.name === "string"
          ? item.name.trim()
          : "";

      const quantity = Number(item.quantity);
      const price = Number(item.price);

      let product = null;

      if (
        item.product !== undefined &&
        item.product !== null &&
        item.product !== ""
      ) {
        if (!mongoose.Types.ObjectId.isValid(item.product)) {
          return res.status(400).json({
            success: false,
            message: `Invalid product ID for ${name || "order item"}`,
          });
        }

        product = item.product;
      }

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Every order item must have a name",
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for ${name}`,
        });
      }

      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid price for ${name}`,
        });
      }

      cleanedItems.push({
        product,
        name,
        quantity,
        price,
        image:
          typeof item.image === "string"
            ? item.image
            : "",
      });
    }

    // ==============================
    // TOTAL AMOUNT
    // ==============================

    const numericTotal = Number(totalAmount);

    if (
      !Number.isFinite(numericTotal) ||
      numericTotal < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid total amount is required",
      });
    }

    // ==============================
    // PAYMENT METHOD
    // ==============================

    const allowedPaymentMethods = [
      "Cash on Delivery",
      "Credit / Debit Card",
      "JazzCash / EasyPaisa",
    ];

    const finalPaymentMethod =
      allowedPaymentMethods.includes(paymentMethod)
        ? paymentMethod
        : "Cash on Delivery";

    // ==============================
    // STATUS
    // ==============================

    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    const finalStatus =
      allowedStatuses.includes(status)
        ? status
        : "Pending";

    // ==============================
    // CREATE ORDER
    // ==============================

    const order = await Order.create({
      customer: validCustomer,

      customerName: customerName.trim(),

      customerEmail:
        typeof customerEmail === "string"
          ? customerEmail.trim()
          : "",

      customerPhone:
        typeof customerPhone === "string"
          ? customerPhone.trim()
          : "",

      restaurant:
        typeof restaurant === "string" &&
        restaurant.trim()
          ? restaurant.trim()
          : "FlavorNest",

      items: cleanedItems,

      totalAmount: numericTotal,

      deliveryAddress:
        typeof deliveryAddress === "string"
          ? deliveryAddress.trim()
          : "",

      paymentMethod: finalPaymentMethod,

      status: finalStatus,
    });

    // ==============================
    // POPULATE CUSTOMER
    // ==============================

    const populatedOrder =
      await Order.findById(order._id).populate(
        "customer",
        "name email phone"
      );

    console.log(
      "ORDER CREATED:",
      populatedOrder?._id?.toString()
    );

    // ==============================
    // SUCCESS RESPONSE
    // ==============================

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("=================================");
    console.error("CREATE ORDER ERROR");
    console.error("NAME:", error.name);
    console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE COMPLETE ORDER
// ==============================

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
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

    return res.json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE ORDER STATUS
// ==============================

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
        allowedStatuses,
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
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

    return res.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// ==============================
// DELETE ORDER
// ==============================

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order =
      await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};

// ==============================
// EXPORTS
// ==============================

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};