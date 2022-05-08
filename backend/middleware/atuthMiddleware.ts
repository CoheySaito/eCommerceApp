import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";

dotenv.config({
  path: "./.env",
});

const protect = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as jwt.JwtPayload;

        // select:取得フィールドを選択 -password:マイナスをつけることでそのフィールドだけ取得しないという指定
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("NOt authorized token failed");
      }
    }

    if (!token) {
      res.status(404);
      throw new Error("Not authorized, no token");
    }
  }
);

const admin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
