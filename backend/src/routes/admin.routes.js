const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const {
  getDashboard,
  getAllUsers,
  getAllProperties,
  approveProperty,
  rejectProperty,
} = require("../controllers/admin.controller");

router.get("/dashboard", protect, adminOnly, getDashboard);

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/properties", protect, adminOnly, getAllProperties);

router.put("/approve/:id", protect, adminOnly, approveProperty);

router.put("/reject/:id", protect, adminOnly, rejectProperty);

module.exports = router;