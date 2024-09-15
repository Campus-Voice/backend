module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      participants: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "chats",
    }
  );
  return Chat;
};
