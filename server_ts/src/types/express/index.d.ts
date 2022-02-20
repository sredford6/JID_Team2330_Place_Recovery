import { IUser } from "models/user.model";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      currentUser: Document<unknown, any, IUser> & IUser;
    }
  }
}
