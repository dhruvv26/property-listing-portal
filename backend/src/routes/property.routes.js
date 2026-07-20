const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const {
  createProperty,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  uploadImages,
  getApprovedProperties,
  getApprovedPropertyById,
} = require("../controllers/property.controller");


// Public APIs
router.get("/public", getApprovedProperties);
router.get("/public/:id", getApprovedPropertyById);
// Property CRUD
router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createProperty
);;
router.get("/my", protect, getMyProperties);
router.get("/:id", protect, getPropertyById);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

// Image Upload
router.post(
  "/:id/images",
  protect,
  upload.array("images", 10),
  uploadImages
);

module.exports = router;