const User = require("../models/User");
const crypto = require("crypto");

const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

/*
    Register User
*/
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      phone,
      password,
      verificationToken,
      isVerified: false,
    });

    const verifyURL = `http://localhost:3000/verify/${verificationToken}`;

    await sendEmail({
      email: user.email,
      subject: "Verify Your Email",
      message: `
        <h2>Welcome to Property Portal</h2>

        <p>Click the button below to verify your account.</p>

        <a href="${verifyURL}"
        style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;">
            Verify Account
        </a>

        <br><br>

        <p>If the button doesn't work, copy this link:</p>

        <p>${verifyURL}</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
    Verify Email
*/
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = "";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
    Login User
*/
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetUrl =
`http://localhost:3000/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message: `
<h2>Password Reset</h2>

<p>Click below to reset your password.</p>

<a
href="${resetUrl}"
style="
background:#2563eb;
color:white;
padding:12px 20px;
border-radius:6px;
text-decoration:none;
display:inline-block;
">
Reset Password
</a>

<br><br>

<p>If the button doesn't work, copy this link:</p>

<p>${resetUrl}</p>

<br>

<p>Link expires in 15 minutes.</p>
`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token.",
      });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};