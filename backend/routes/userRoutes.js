/* eslint-disable @typescript-eslint/no-require-imports */

const express = require("express");

const {
  getUsers,
  getUser,
  updateUserStatus,
} = require("../controllers/userController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL USERS
router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

// GET SINGLE USER
router.get(
  "/:id",
  protect,
  adminOnly,
  getUser
);

// UPDATE USER STATUS
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateUserStatus
);

module.exports = router;