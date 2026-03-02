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
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UserSchema = new Schema(
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

    // password: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true },
);

UserSchema.plugin(passportLocalMongoose.default);

export const UserModel = mongoose.model("UserModel", UserSchema);
