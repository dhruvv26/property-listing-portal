const Enquiry = require("../models/enquiry.model");
const Property = require("../models/Property");
const createEnquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;

    if (!propertyId || !name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const enquiry = await Enquiry.create({
      property: propertyId,
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate("property", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
};