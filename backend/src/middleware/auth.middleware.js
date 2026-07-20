const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    console.log("Authorization Header:", req.headers.authorization);

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);

    return res.status(401).json({
      success: false,
      message: "Token Invalid",
    });
  }
};

module.exports = protect;