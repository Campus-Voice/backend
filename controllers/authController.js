const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/nodemailer");
const { generateOtp, otpExpiration } = require("../utils/otpUtils");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(otpExpiration());

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpires,
    });

    sendOtpEmail(email, otp);

    return res.status(201).json({
      message: "User registered successfully. OTP sent to your email.",
      userId: newUser.id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error registering user." });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (new Date() > user.otpExpires) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "OTP verified successfully. You can now log in." });
  } catch (error) {
    return res.status(500).json({ error: "Error verifying OTP." });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.otp || user.otpExpires) {
      return res
        .status(400)
        .json({ error: "Please verify your OTP before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    return res.status(200).json({
      message: "Login successful",
      userId: user.id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in user." });
  }
};

// Resend OTP
exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate new OTP and update expiration
    const newOtp = generateOtp();
    user.otp = newOtp;
    user.otpExpires = new Date(otpExpiration());
    await user.save();

    // Send new OTP via email
    sendOtpEmail(email, newOtp);

    return res.status(200).json({ message: "New OTP sent to your email." });
  } catch (error) {
    return res.status(500).json({ error: "Error resending OTP." });
  }
};
