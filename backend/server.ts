import express from "express";
const app: express.Express = express();

import path from "path";

import morgen from "morgan";

import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import connectDB from "./config/db";

import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import orderRouter from "./routes/orderRoutes";
import uploadRouter from "./routes/uploadRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

connectDB();

// logger morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgen("dev"));
}

//accept json data as a body
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", ({}, res: express.Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
