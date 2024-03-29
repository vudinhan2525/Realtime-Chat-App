import { MiddleWareFn } from "../interfaces/MiddleWareFn";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";

export const login = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
}));
export const register = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  const user = User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  console.log(user);
  res.status(200).json({
    status: "success",
    data: user,
  });
}));
