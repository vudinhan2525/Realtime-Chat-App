import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import UserConv from "../models/user_conv.model";
import User from "../models/users.model";
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

export const addMessage = async (
  message: string,
  jwtToken: string,
  convId: number
) => {
  try {
    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );
    const userId = decoded.id;
    const response = await Message.create({
      message: message,
      user_id: userId,
      conv_id: convId,
    });
    return response.dataValues;
  } catch (error) {
    console.log(error);
  }
};
export const getAllChat = async (jwtToken: string) => {
  try {
    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );
    const userId = decoded.id;
    const convIds = await UserConv.findAll({
      where: { user_id: userId },
    });
    let resArr: any = [];
    for (let i = 0; i < convIds.length; i++) {
      const userconv = await UserConv.findAll<any>({
        where: { conv_id: convIds[i].dataValues.conv_id },
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
          attributes: ["username", "user_id", "isActive", "lastActive"],
        });
        const message = await Message.findAll({
          where: { conv_id: convIds[i].dataValues.conv_id },
          order: ["createdAt"],
        });
        const newArr = message.map((el) => {
          return el.dataValues;
        });
        resArr.push({
          conv_id: convIds[i].dataValues.conv_id,
          friend,
          data: message,
        });
      } else {
        //group chat
      }
    }
    return resArr;
  } catch (error) {
    console.log(error);
  }
};
export const updateUserStatus = async (jwtToken: string, isActive: boolean) => {
  try {
    const decoded = await promisify(jwt.verify)(
      jwtToken,
      process.env.JWT_SECRET
    );
    const userId = decoded.id;
    await User.update(
      {
        isActive: isActive,
        lastActive: new Date(),
      },
      { where: { user_id: userId } }
    );
  } catch (error) {
    console.log(error);
  }
};
