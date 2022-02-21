import { Schema, model } from "mongoose";
import { IAnswers, AnswersSchema } from "models/answer.model";

export interface IUser {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  resetCode?: string;
  resetTries?: number;
  admin: boolean;
  answers: IAnswers[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  resetCode: { type: String, required: false },
  resetTries: { type: Number, required: false },
  admin: { type: Boolean, default: false },
  answers: [AnswersSchema],
});

export default model<IUser>("User", UserSchema);
