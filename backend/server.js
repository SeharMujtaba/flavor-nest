/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */

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
// Allowed Frontend Origins
// -------------------------

const allowedOrigins = [
  "http://localhost:3000",
  "https://flavor-nest-sage.vercel.app",
];

// -------------------------
// Middleware
// -------------------------

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // such as Postman/server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,
  })
);

app.use(express.json());

// -------------------------
// Test Route
// -------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FlavorNest Backend API is running",
  });
});

// -------------------------
// Health Check
// -------------------------

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FlavorNest backend is healthy",
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
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// -------------------------
// Start Server
// -------------------------

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `FlavorNest backend running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "DATABASE CONNECTION ERROR:",
      error
    );

    process.exit(1);
  }
};

startServer();