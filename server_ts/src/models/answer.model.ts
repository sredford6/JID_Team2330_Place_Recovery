import { Schema, model } from "mongoose";

export interface IAnswer {
  questionId: string;
  answer: string | number | string[] | number[];
  choiceIndex: number;
}

export interface IAnswers {
  datetime: Date;
  questionnaire: string;
  answers: IAnswer[];
}

export const AnswersSchema = new Schema<IAnswers>({
  datetime: { type: Date, required: true },
  questionnaire: { type: String, required: true },
  answers: [
    {
      questionId: { type: String, required: true },
      answer: { type: Schema.Types.Mixed, required: true },
      choiceIndex: { type: Number, required: true },
    },
  ],
});

export default model<IAnswers>("Answers", AnswersSchema);
