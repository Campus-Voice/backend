const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      media: {
        type: DataTypes.STRING, // URL to media
        allowNull: true,
      },
      partyId: {
        type: DataTypes.UUID, // Change to UUID
        allowNull: false,
        references: {
          model: "Parties",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID, // Change to UUID
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Post;
};
