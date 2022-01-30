import { Schema, Model, model, Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  resetCode?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  resetCode: { type: String, required: false },
});

export default model<IUser>("User", UserSchema);
