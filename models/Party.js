const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define(
    "Party",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      partyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      leaderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Party;
};
