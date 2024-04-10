import User from "../models/users.model";
import UserConv from "../models/user_conv.model";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

import IUser from "../interfaces/IUser";
import { MiddleWareFn } from "../interfaces/MiddleWareFn";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";
import AppError from "../utils/AppError";
const { Op } = require("sequelize");
const { promisify } = require("util");
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
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError(
        ["Please provide email !!!", "Please provide password !!!"],
        400,
        ["email", "password"]
      )
    );
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return next(
      new AppError(["There is no user with this email!!!"], 400, ["email"])
    );
  }
  if (!(await user.validatePassword(password))) {
    return next(
      new AppError(
        ["Email or password is wrong!!!", "Email or password is wrong!!!"],
        400,
        ["email", "password"]
      )
    );
  }
  sendJsonToken(user.dataValues, 200, req, res);
}));
export const register = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) {
    return next(new AppError(["Email has been used!!!"], 400, ["email"]));
  }
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  sendJsonToken(user.dataValues, 200, req, res);
}));
export const protect = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  let token;
  //1) Check if token is exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError(["Please login !!!"], 401, []));
  }
  //2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const curUser = await User.findOne({
    where: { user_id: decoded.id },
    logging: false,
  });
  if (!curUser) {
    return next(new AppError(["User not exists !!!"], 400, []));
  }

  // //4) Check if user changed password
  // if (curUser.verifyPasswordChanged(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password, please try again", 401)
  //   );
  // }
  //req.user = curUser;
  res.locals.user = curUser;
  next();
}));
export const getChatList = catchAsync(<MiddleWareFn>(async (req, res, next) => {
  const user = res.locals.user.dataValues as User;

  const userconv = await UserConv.findAll<any>({
    include: {
      model: Conversation,
      as: "Conversation",
    },
    where: { user_id: user.user_id },
    order: [[Conversation, "updatedAt", "DESC"]],
  });

  const conversations = userconv.map<any>((userconv) => userconv.Conversation);
  let chatListArr: any = [];
  const chatListPromises = conversations.map(async (element, idx) => {
    if (element.dataValues.title === null) {
      // is 2 way chat
      const userFriend = await UserConv.findOne<any>({
        include: {
          model: User,
          as: "User",
          attributes: ["user_id", "username"],
        },
        where: [
          { user_id: { [Op.ne]: user.user_id } },
          { conv_id: { [Op.eq]: element.dataValues.conv_id } },
        ],
      });
      const lastMessage = await Message.findOne({
        where: { conv_id: { [Op.eq]: element.dataValues.conv_id } },
        order: [["createdAt", "DESC"]],
        attributes: ["user_id", "message"],
      });
      return {
        friend: userFriend.dataValues.User.dataValues,
        lastMessage: lastMessage?.dataValues,
        updatedAt: element.dataValues.updatedAt,
        title: null,
      };
    } else {
      // is group chat
      return null;
    }
  });
  chatListArr = await Promise.all(chatListPromises);
  res.status(200).json({
    status: "success",
    data: chatListArr,
  });
}));
