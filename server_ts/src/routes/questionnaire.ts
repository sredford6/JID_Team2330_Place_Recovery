import express, { Request, Response } from "express";
const router = express.Router();

import { verify } from "middleware";
import { IUser } from "models/user.model";

import { validateQuestionArray } from "helpers/validators";

router.post("/create", (req, res: Response) => {
  try {
    // const user: IUser = req.currentUser;
    // if (!user.admin) {
    //   throw {
    //     code: 403,
    //     message: `user is not an admin.`,
    //     error: new Error(`user is not an admin.`),
    //   };
    // }
    if (!validateQuestionArray(req.body)) {
      throw {
        code: 400,
        message: `question format is incorrect.`,
        error: new Error(`question format is incorrect.`),
      };
    }

    res.status(200).json({ isValidRequest: true });
  } catch (error: any) {
    res.status(error.code || 500).json(error);
  }
});

export default router;
