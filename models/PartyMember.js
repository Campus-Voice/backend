const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const PartyMember = sequelize.define(
    "PartyMember",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
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
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
      joinedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return PartyMember;
};
