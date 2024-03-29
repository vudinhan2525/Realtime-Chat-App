const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
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
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isCorrectConfirmPassword(value: string) {
        if (value !== (this.password as string)) {
          throw new Error("Passwords do not match");
        }
      },
    },
  },
});
User.beforeCreate(async (user) => {
  if (user.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  }
});
(async () => {
  try {
    await User.sync({ alter: true });
    console.log("Model synced successfully.");
  } catch (error) {
    console.error("Unable to sync model with database:", error);
  }
})();

export default User;
