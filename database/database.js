const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("ikudashkin_vols", "ikudashkin_vols", "123456", {
    host: "ikudashkin.beget.tech",
    dialect: "mysql",
    // operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;