/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@flavornest.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "FlavorNest Admin",
      email: "admin@flavornest.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();