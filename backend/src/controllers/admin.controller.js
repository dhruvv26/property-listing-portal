const User = require("../models/User");
const Property = require("../models/Property");

const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProperties = await Property.countDocuments();

    const pendingProperties = await Property.countDocuments({
      status: "PENDING",
    });

    const approvedProperties = await Property.countDocuments({
      status: "APPROVED",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalProperties,
        pendingProperties,
        approvedProperties,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    if (status && status !== "ALL") {
      filter.status = status;
    }

    const properties = await Property.find(filter)
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "APPROVED";
    property.rejectionReason = "";

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property approved",
      property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "REJECTED";
    property.rejectionReason =
      req.body.reason || "Rejected by Admin";

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property rejected",
      property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
  getAllUsers,
  getAllProperties,
  approveProperty,
  rejectProperty,
};