const { Sequelize } = require("sequelize");
const config = require("../config/config.json")["development"];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require("./User")(sequelize, Sequelize);
db.Notification = require("./Notification")(sequelize, Sequelize);
db.Party = require("./Party")(sequelize, Sequelize);
db.PartyMember = require("./PartyMember")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Vote = require("./Vote")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Chat = require("./Chat")(sequelize, Sequelize);
db.Message = require("./Message")(sequelize, Sequelize);

require("./Associations")(db);

// Export db
module.exports = db;
