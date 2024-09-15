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
        type: DataTypes.JSON,
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      partyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Parties",
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
