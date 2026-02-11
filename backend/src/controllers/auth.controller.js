import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "node:crypto";

const ACCESS_TOKEN_TTL = 30 * 60 * 1000;
const REFREST_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 DAYS
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please provide firstName, lastName, email and password",
      });
    }

    // Validate exist <user></user>
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already existed" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10); // salt = 10

    // Create user
    await User.create({
      email,
      password: hashPassword,
      fullName: `${firstName} ${lastName}`,
      role: "USER",
    });

    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error while signing up", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFREST_TOKEN_TTL),
    });

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: ACCESS_TOKEN_TTL,
      path: "/",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: REFREST_TOKEN_TTL,
      path: "/",
    });

    return res.status(200).json({
      message: `Welcome ${user.fullName}`,
    });
  } catch (err) {
    console.error("signIn error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await Session.deleteOne({ refreshToken });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error while signing out", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
