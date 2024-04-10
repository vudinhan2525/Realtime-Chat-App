"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      msg_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: { type: Sequelize.INTEGER },
      conv_id: { type: Sequelize.INTEGER },
      message: { type: Sequelize.STRING },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Messages", {
      fields: ["user_id"],
      type: "foreign key",
      name: "FK_Messages_UserId",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("Messages", {
      fields: ["conv_id"],
      type: "foreign key",
      name: "FK_Messages_Conversation",
      references: {
        table: "Conversations",
        field: "conv_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "Messages",
      "FK_Messages_Conversation"
    );
    await queryInterface.removeConstraint("Messages", "FK_Messages_UserId");
    await queryInterface.dropTable("Messages");
  },
};
