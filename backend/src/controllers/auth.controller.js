import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "node:crypto";

const ACCESS_TOKEN_TTL = "30m";
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

    // Validate exist user
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

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Validate exist user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "email or password is invalid" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({ message: "email or password is invalid" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFREST_TOKEN_TTL),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFREST_TOKEN_TTL,
    });

    return res
      .status(200)
      .json({ message: `User ${user.fullName} logged in`, accessToken });
  } catch (error) {
    console.error("Error while signing in", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (token) {
      await Session.deleteOne({ refreshToken: token });
      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log("Error while signing out", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
