import express, { Request, Response } from "express";
import * as csv from "@fast-csv/format";
const router = express.Router();

import User, { IUser } from "models/user.model";

router.get("/users", async (req, res: Response) => {
  try {
    const users: IUser = (await User.find({})) as unknown as IUser;
    console.log(users);
    res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(error.httpCode || 500).json(error);
  }
});

export default router;