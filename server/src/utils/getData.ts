import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import UserConv from "../models/user_conv.model";
import User from "../models/users.model";
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
export const getChat = async (convId: number, jwtToken: string) => {
  try {
    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );
    const userId = decoded.id;
    const userconv = await UserConv.findAll<any>({
      where: { conv_id: convId },
    });
    if (userconv.length === 2) {
      //is 2 way chat
      let friendId;
      userconv.forEach((el) => {
        if (el.dataValues.user_id.toString() !== userId) {
          friendId = el.dataValues.user_id;
        }
      });
      const friend = await User.findOne({
        where: { user_id: friendId },
        attributes: ["username", "user_id"],
      });
      const message = await Message.findAll({
        where: { conv_id: convId },
        order: ["createdAt"],
      });
      const newArr = message.map((el) => {
        return el.dataValues;
      });
      return {
        friend,
        data: message,
      };
    } else {
      //group chat
    }
    const data = { status: "success" };
    return data;
  } catch (error) {}
};
