import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../server";
import IMessage from "../interfaces/IMessage";
import User from "./users.model";
import Conversation from "./conversation.model";
class Message extends Model<IMessage> implements IMessage {
  public msg_id!: number;
  public conv_id!: number;
  public user_id!: number;
  public message!: string;
}

Message.init(
  {
    msg_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    conv_id: { type: DataTypes.INTEGER },
    message: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Message",
  }
);
Message.belongsTo(User, { foreignKey: "user_id" });
Message.belongsTo(Conversation, { foreignKey: "conv_id" });
export default Message;
