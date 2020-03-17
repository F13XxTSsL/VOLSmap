const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
    "profiles", {
        id_user: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        profile_status: {
            type: Sequelize.STRING
        },
        fio: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        position: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
)
