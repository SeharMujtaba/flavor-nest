/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------------
// Connect Database
// -------------------------
connectDB();

// -------------------------
// Middleware
// -------------------------
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// -------------------------
// Test Route
// -------------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FlavorNest Backend API is running",
  });
});

// -------------------------
// API Routes
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// -------------------------
// 404 Handler
// -------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// -------------------------
// Error Handler
// -------------------------
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Server Error",
    error: err.message,
  });
});

// -------------------------
// Start Server
// -------------------------
app.listen(PORT, () => {
  console.log(`FlavorNest backend running on http://localhost:${PORT}`);
});