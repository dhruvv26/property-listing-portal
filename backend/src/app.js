require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");

const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");
const enquiryRoutes = require("./routes/enquiry.routes");

const app = express();

// Security
app.use(helmet());

// CORS
// CORS
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body Parser (MUST come before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

app.use("/api/admin", adminRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/enquiry", enquiryRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Property Listing Portal API is running 🚀",
  });
});



module.exports = app;