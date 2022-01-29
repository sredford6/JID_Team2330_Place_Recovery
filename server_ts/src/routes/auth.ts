import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

import User, { IUser } from "models/user.model";
const middleware = require("middleware");
import authObj from "config/auth.json";

const rounds = 10;
const tokenSecret: string = authObj.tokenSecret;

router.get("/login", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user: IUser = await User.findOne({ email: email });
    if (!user) {
      throw {
        code: 404,
        message: `user with email ${email} not found.`,
        error: new Error(`user with email ${email} not found.`),
      };
    }
    const isMatch: boolean = await bcrypt.compare(
      req.body.password,
      user.password
    );
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
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw {
        message: `user with email ${email} already exists!`,
        error: new Error(`user with email ${email} already exists!`),
      };
    }
    const hash = await bcrypt.hash(req.body.password, rounds);
    const newUser = new User({
      email: email,
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

router.get("/jwt-test", middleware.verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

function generateToken(user: IUser) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

export default router;
