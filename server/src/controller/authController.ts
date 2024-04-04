import IUser from "../interfaces/IUser";
import { MiddleWareFn } from "../interfaces/MiddleWareFn";
import User from "../models/users.model";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import AppError from "../utils/AppError";
const jwt = require("jsonwebtoken");
const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};
const sendJsonToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
) => {
  if (user.user_id === undefined) {
    throw new Error("User ID is undefined");
  }
  console.log(user.user_id.toString());
  const token = signToken(user.user_id.toString());
  const expir = parseInt(process.env.JWT_COOKIE_EXPIRE_IN as string) || 1;

  const cookieOptions = {
    expires: new Date(Date.now() + expir * 24 * 60 * 60 * 1000),
    //httpOnly: true,
  };
  res.cookie("jwt", token, {
    ...cookieOptions,
  });
  res.status(statusCode).json({
    status: "success",
    token,
  });
};
export const login = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
}));
export const register = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) {
    return next(new AppError("Email has been used!!!", 400, "email"));
  }
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  sendJsonToken(user.dataValues, 200, req, res);
}));
