import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import authRoutes from "./routes/authroutes.js";
import MongoStore, { createWebCryptoAdapter } from "connect-mongo";
import session, { CookieOptions } from "express-session";
import { UserModel } from "./models/UserModel.js";
import passport from "passport";
// import LocalStrategy from "passport-local";

const app = express();

app.use(express.json());
app.use(cors());

// types
interface ErrTypes {
  status: number;
  message: string;
}

//database connection
main().catch((err) => console.log(err));
async function main() {
  if (process.env.MONGO_DB_CONNECT) {
    await mongoose.connect(process.env.MONGO_DB_CONNECT);
  }
}

//mongo-store config
//crypto is almost deprecated
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_DB_CONNECT,
  touchAfter: 24 * 3600,
  cryptoAdapter: createWebCryptoAdapter({
    secret: process.env.STORE_SECRET!,
  }),
  timestamps: true,
});

// Express Sessions
const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

if (process.env.SESSION_SECRET) {
  app.use(
    session({
      store: store,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: sessionCookieOptions,
    }),
  );
}

// type _User = typeof UserModel;

// declare global {
//   namespace Express {
//     interface User extends _User {}
//   }
// }

//passport-local configuration
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(UserModel.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser());

// Routes
app.use("/api/auth/", authRoutes);

// Page not found error handler
app.use((_req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});

// Error handler
app.use((err: ErrTypes, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
