import express, { Request, Response } from "express";
import * as csv from "@fast-csv/format";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { verify } from "middleware";

router.get("/users", async (req, res: Response) => {
  try {
    const users: IUser = (await User.find({})) as unknown as IUser;
    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(error.httpCode || 500).json(error);
  }
});

router.get("/myuser", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

export default router;