import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../server";
import IUser from "../interfaces/IUser";
const bcrypt = require("bcrypt");

class User extends Model<IUser> implements IUser {
  public user_id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public confirmPassword!: string | undefined;
  public isActive!: boolean;
  public lastActive!: Date;

  async validatePassword(value: string): Promise<boolean> {
    return bcrypt.compare(value, this.password);
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    lastActive: {
      type: DataTypes.DATE,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      validate: {
        isCorrectConfirmPassword(value: string) {
          if (value !== this.password) {
            throw new Error("Passwords do not match");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);
User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    user.confirmPassword = undefined;
  }
});
export default User;
