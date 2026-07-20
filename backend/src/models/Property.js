const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    rejectionReason: {
  type: String,
  default: "",
},

    propertyType: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },

    listingPurpose: {
      type: String,
      enum: ["Sale", "Rent"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    area: {
      type: Number,
      required: true,
    },

    areaUnit: {
      type: String,
      required: true,
    },

    address: String,
    locality: String,
    city: String,
    state: String,
    pinCode: String,

    bedrooms: Number,
    bathrooms: Number,

    furnishing: String,

    parking: {
      type: Boolean,
      default: false,
    },

    propertyAge: Number,

    possessionStatus: String,

    availableFrom: Date,

    amenities: [
      {
        type: String,
      },
    ],

    images: [
  {
    url: String,
    public_id: String,
  },
],

coverImage: {
  url: String,
  public_id: String,
},

    status: {
      type: String,
      enum: ["DRAFT", "PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);