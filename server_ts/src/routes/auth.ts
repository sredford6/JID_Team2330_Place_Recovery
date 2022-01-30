import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { verify } from "middleware";
import { sendEmail } from "helpers/nodemailer";
import { validateEmail, validatePassword } from "helpers/validators";
import authObj from "config/auth.json";

const rounds = 10;
const tokenSecret: string = authObj.tokenSecret;

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser = await User.findOne({ email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ token: generateToken(user) });
    } else {
      throw {
        code: 403,
        message: `passwords do not match.`,
        error: new Error(`passwords do not match.`),
      };
    }
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      throw {
        code: 400,
        message: `email string "${email}" is not a valid email`,
        error: `email string "${email}" is not a valid email`,
      };
    }
    if (!validatePassword(password)) {
      throw {
        code: 400,
        message: `password string is not valid`,
        error: `password string is not valid`,
      };
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw {
        message: `user with email "${email}" already exists!`,
        error: new Error(`user with email "${email}" already exists!`),
      };
    }
    const hash = await bcrypt.hash(req.body.password, rounds);
    const newUser = new User({
      email,
      password: hash,
      phoneNumber: req.body.phoneNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const user = await newUser.save();
    res.status(200).json({ token: generateToken(user) });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.get("/get-reset", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    user.resetCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    await user.save();
    sendEmail({
      subject: "[Neighborhood] Reset Password",
      text: `Your reset code is ${user.resetCode}`,
      to: user.email,
      from: authObj.google.email,
    });
    res.status(200).json({
      message: `Reset code sent to "${email}"`,
    });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

router.get("/jwt-test", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

function generateToken(user: IUser) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

export default router;
