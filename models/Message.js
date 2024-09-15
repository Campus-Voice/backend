module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", 
          key: "id",
        },
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", 
          key: "id",
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      chatId: {
        type: DataTypes.INTEGER,
        references: {
          model: "chats",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      tableName: "messages",
    }
  );
  return Message;
};
