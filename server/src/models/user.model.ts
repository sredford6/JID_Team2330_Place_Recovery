import { Schema, model } from "mongoose";
import { IAnswers, AnswersSchema } from "models/answer.model";

export interface IUser {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  gender: string;
  race: string;
  education?: string;
  occupation?: string;
  numberOfMoves?: string;
  personalHistoryIllness?: string[];
  familyHistoryIllness?: string[];
  birthday: Date;
  wakeTime: Date;
  sleepTime: Date;

  password: string;
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
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  gender: { type: String, required: true },
  race: { type: String, required: true },
  education: { type: String },
  occupation: { type: String },
  numberOfMoves: { type: String },
  personalHistoryIllness: { type: [String] },
  familyHistoryIllness: { type: [String] },
  birthday: { type: Date, required: true },
  wakeTime: { type: Date, required: true },
  sleepTime: { type: Date, required: true },
  resetCode: { type: String, required: false },
  resetTries: { type: Number, required: false },
  admin: { type: Boolean, default: false },
  answers: [AnswersSchema],
});

export default model<IUser>("User", UserSchema);
