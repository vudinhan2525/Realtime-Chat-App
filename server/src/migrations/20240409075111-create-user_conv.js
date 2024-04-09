"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User_conv", {
      user_id: { type: Sequelize.INTEGER, primaryKey: true },
      conv_id: { type: Sequelize.INTEGER, primaryKey: true },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("User_conv", {
      fields: ["user_id"],
      type: "foreign key",
      name: "FK_UserConversation_UserId",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("User_conv", {
      fields: ["conv_id"],
      type: "foreign key",
      name: "FK_UserConversation_ConversationId",
      references: {
        table: "Conversation",
        field: "conv_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "User_conv",
      "FK_UserConversation_UserId"
    );
    await queryInterface.removeConstraint(
      "User_conv",
      "FK_UserConversation_ConversationId"
    );
    await queryInterface.dropTable("User_conv");
  },
};
