import mongoose from "mongoose";
import { roles } from "../utils/roles.js";
import passportLocalMongoose, {
  PassportLocalMongooseDocument,
  PassportLocalMongooseSchema,
} from "passport-local-mongoose";

const { Schema } = mongoose;

interface IUser extends Document {
  setPassword(password: string): Promise<void>;
  authenticate(): Promise<void>;
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(roles),
    },
  },
  { timestamps: true },
);

UserSchema.plugin(passportLocalMongoose.default);

export const UserModel = mongoose.model<IUser>("UserModel", UserSchema);
