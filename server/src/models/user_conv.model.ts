import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../server";
import IUserConv from "../interfaces/IUserConv";
import User from "./users.model";
import Conversation from "./conversation.model";
class UserConv extends Model<IUserConv> implements IUserConv {
  public user_id!: number;
  public conv_id!: number;
}

UserConv.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    conv_id: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    sequelize,
    modelName: "UserConv",
  }
);
UserConv.belongsTo(User, { foreignKey: "user_id" });
UserConv.belongsTo(Conversation, { foreignKey: "conv_id" });
export default UserConv;
