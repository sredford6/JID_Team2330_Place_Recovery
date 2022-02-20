import express, { Request, Response } from "express";
import { writeFile, access } from "fs/promises";
import path from "path";
const router = express.Router();

import { verify } from "middleware";
import { IUser } from "models/user.model";

import { validateQuestionArray } from "helpers/validators";
const questionsPath = path.resolve("src", "public", "questions");

router.post("/create", verify, async (req, res: Response) => {
  try {
    const user: IUser = req.currentUser;
    if (!user.admin) {
      throw {
        code: 403,
        message: `user is not an admin.`,
        error: new Error(`user is not an admin.`),
      };
    }
    const { questions, id }: { questions: any[]; id: string } = req.body;
    if (!validateQuestionArray(questions)) {
      throw {
        httpCode: 400,
        message: `question format is incorrect.`,
        error: new Error(`question format is incorrect.`),
      };
    }

    const questionSaveFile = path.join(questionsPath, `${id}.json`);
    await writeFile(questionSaveFile, JSON.stringify(questions));

    res.status(200).json({ isValidRequest: true });
  } catch (error: any) {
    res.status(error.httpCode || 500).json(error);
  }
});

router.get("/:questionnaire", async (req: Request, res: Response) => {
  try {
    const { questionnaire } = req.params;
    const questionSaveFile = path.join(questionsPath, questionnaire);
    await access(questionSaveFile);
    res.header("Content-Type", "application/json");
    res.sendFile(questionSaveFile);
  } catch (error: any) {
    res.status(error.httpCode || 500).json(error);
  }
});

export default router;
