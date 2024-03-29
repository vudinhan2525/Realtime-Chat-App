import { MiddleWareFn } from "../interfaces/MiddleWareFn";
import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
export const login = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
}));
export const register = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  const { password: _, confirmPassword: __, ...userData } = user.toJSON();
  res.status(200).json({
    status: "success",
    data: userData,
  });
}));
