const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");

/*
    POST /api/property
*/
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      listingPurpose,
      category,
      price,
      area,
      areaUnit,
      address,
      locality,
      city,
      state,
      pinCode,
      bedrooms,
      bathrooms,
      furnishing,
      parking,
      propertyAge,
      possessionStatus,
      availableFrom,
      amenities,
    } = req.body;

    const property = await Property.create({
      owner: req.user._id,
      title,
      description,
      propertyType,
      listingPurpose,
      category,
      price,
      area,
      areaUnit,
      address,
      locality,
      city,
      state,
      pinCode,
      bedrooms,
      bathrooms,
      furnishing,
      parking,
      propertyAge,
      possessionStatus,
      availableFrom,
      amenities,
      images: [],
      coverImage: "",
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    GET /api/property/my
*/
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

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

/*
    GET /api/property/:id
*/
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    PUT /api/property/:id
*/
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only owner can update
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    DELETE /api/property/:id
*/
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const uploadImages = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Select images",
      });
    }

    if (req.files.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Maximum 10 images allowed",
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "property-listing",
      });

      uploadedImages.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    property.images = uploadedImages;
    property.coverImage = uploadedImages[0];

    await property.save();

    res.status(200).json({
      success: true,
      message: "Images uploaded",
      property,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    GET /api/properties
*/

const getApprovedProperties = async (req, res) => {
  try {
    const {
      city,
      state,
      title,
      propertyType,
      listingPurpose,
      category,
      bedrooms,
      bathrooms,
      furnishing,
      parking,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {
      status: "APPROVED",
    };

    // ---------- Text Filters ----------
    if (city)
      filter.city = { $regex: city, $options: "i" };

    if (state)
      filter.state = { $regex: state, $options: "i" };

    if (title)
      filter.title = { $regex: title, $options: "i" };

    if (propertyType)
      filter.propertyType = propertyType;

    if (listingPurpose)
      filter.listingPurpose = listingPurpose;

    if (category)
      filter.category = category;

    if (furnishing)
      filter.furnishing = furnishing;

    // ---------- Numeric Filters ----------
    if (bedrooms)
      filter.bedrooms = Number(bedrooms);

    if (bathrooms)
      filter.bathrooms = Number(bathrooms);

    if (parking !== undefined)
      filter.parking = parking === "true";

    // ---------- Price ----------
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice)
        filter.price.$gte = Number(minPrice);

      if (maxPrice)
        filter.price.$lte = Number(maxPrice);
    }

    // ---------- Area ----------
    if (minArea || maxArea) {
      filter.area = {};

      if (minArea)
        filter.area.$gte = Number(minArea);

      if (maxArea)
        filter.area.$lte = Number(maxArea);
    }

    // ---------- Sorting ----------
    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "price":
        sortOption = { price: 1 };
        break;

      case "-price":
        sortOption = { price: -1 };
        break;

      case "area":
        sortOption = { area: 1 };
        break;

      case "-area":
        sortOption = { area: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "newest":
        sortOption = { createdAt: -1 };
        break;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);

    const total = await Property.countDocuments(filter);

    const properties = await Property.find(filter)
      .populate("owner", "name")
      .sort(sortOption)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      success: true,
      total,
      page: currentPage,
      pages: Math.ceil(total / perPage),
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

/*
    GET /api/properties/:id
*/
const getApprovedPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id: req.params.id,
      status: "APPROVED",
    }).populate("owner", "name email");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
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
  createProperty,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  uploadImages,
  getApprovedProperties,
  getApprovedPropertyById,
};