import express, { NextFunction } from "express";

const notFound = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// エラー処理ミドルウェアは常に 4つ の引数を使用します。エラー処理ミドルウェア関数として識別されるように 4 つの引数を指定する必要があります。
const errorHandler = (
  err: { message: string; stack: string },
  {},
  res: express.Response,
  {}
) => {
  const StatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(StatusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
