import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../server";
import IConversation from "../interfaces/IConversation";
class Conversation extends Model<IConversation> implements IConversation {
  public conv_id!: number;
  public title: string | undefined;
}
Conversation.init(
  {
    conv_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "Conversation",
  }
);
export default Conversation;
