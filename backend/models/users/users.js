const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
    "profiles", {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        profile_status: {
            type: Sequelize.STRING
        }

    }, {
        timestamps: false
    }
)
