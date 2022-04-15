import express, { Request, Response } from "express";
import { format } from "@fast-csv/format";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { verify } from "middleware";

router.get("/users", async (req, res: Response) => {
  try {
    const users = await User.find({}).select(
      "-answers -password -resetCode -resetTries -__v"
    );
    const csvStream = format({ headers: true });
    res.attachment("users.csv");
    res.type("text/csv");
    csvStream.pipe(res);
    for (let user of users) {
      csvStream.write(user.toObject());
    }
    csvStream.end();
  } catch (error: any) {
    console.error(error);
    res.status(error.httpCode || 500).json(error);
  }
});

router.get("/myuser", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

export default router;