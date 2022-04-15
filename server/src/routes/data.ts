import express, { Request, Response } from "express";
import { format } from "@fast-csv/format";
import { Document, Types } from "mongoose";
const router = express.Router();

import User, { IUser } from "models/user.model";
import { IAnswer, IAnswers } from "models/answer.model";
import { verify } from "middleware";
import { formatIAnswers } from "helpers/formatters";

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

router.get("/answers/:user", async (req, res: Response) => {
  try {
    const userId = req.params.user;
    const user = await User.findOne({ _id: userId });
    const { answers } = user;
    answers.sort((a, b) => b.answers.length - a.answers.length);
    const csvStream = format({ headers: true });
    res.attachment(`${user.lastName}_${user.firstName}_Answers.csv`);
    res.type("text/csv");
    csvStream.pipe(res);
    for (let answer of answers) {
      csvStream.write(formatIAnswers(answer));
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