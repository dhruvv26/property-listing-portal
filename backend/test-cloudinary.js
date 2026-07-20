const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "API Secret Loaded:",
  !!process.env.CLOUDINARY_API_SECRET
);

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

(async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
})();