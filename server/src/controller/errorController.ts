import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from "express";
const sendDevErr = (err: AppError, req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    field: err.field,
    stack: err.stack,
  });
};
export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, req, res);
  }
};
