import express, { Request, Response } from "express";
import { format, writeToString } from "@fast-csv/format";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { verify } from "middleware";

router.get("/users", async (req, res: Response) => {
  try {
    const users: IUser[] = await User.find({}).select(
      "-answers -password -resetCode -resetTries"
    );
    const csvStream = format({ headers: true });
    // const csvString = await writeToString(users);
    // // console.log(csvString);
    res.type("text/csv");
    csvStream.pipe(res);
    for (let user of users) {
      console.log(user);
      csvStream.write(user);
    }
    csvStream.end();
    // res.status(200).json(users);
  } catch (error: any) {
    console.error(error);
    res.status(error.httpCode || 500).json(error);
  }
});

router.get("/myuser", verify, (req, res: Response) => {
  res.status(200).json(req.currentUser);
});

export default router;