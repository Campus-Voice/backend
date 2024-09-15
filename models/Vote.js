const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    "Vote",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID, // Change to UUID
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      postId: {
        type: DataTypes.UUID, // Change to UUID
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
      },
      voteType: {
        type: DataTypes.ENUM("upvote", "downvote"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Vote;
};
