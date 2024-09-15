module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      senderId: {
        type: DataTypes.UUID, // Should match the UUID type used in User model
        allowNull: false,
        references: {
          model: "Users", // This refers to the table name, not the imported model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      receiverId: {
        type: DataTypes.UUID, // Should match the UUID type used in User model
        allowNull: false,
        references: {
          model: "Users", // This refers to the table name, not the imported model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tableName: "messages",
    }
  );
  return Message;
}; 