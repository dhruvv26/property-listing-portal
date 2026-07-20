const express = require("express");

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const {
  createEnquiry,
  getAllEnquiries,
} = require("../controllers/enquiry.controller");

const router = express.Router();

// Public
router.post("/", createEnquiry);

// Admin
router.get("/", protect, adminOnly, getAllEnquiries);

module.exports = router;