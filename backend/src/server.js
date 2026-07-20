const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const app = require("./app");
const connectDB = require("./config/db");


// Debug
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "API Secret Loaded:",
  !!process.env.CLOUDINARY_API_SECRET
);

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});