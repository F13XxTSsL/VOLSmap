const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("ikudashkin_vols", "ikudashkin_vols", "Dvtcntvs", {
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

module.exports = db;