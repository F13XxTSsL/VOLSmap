const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
    "partners", {
        id_partner: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        INN: {
            type: Sequelize.STRING
        },
        contacts: {
            type: Sequelize.STRING,
        },
        comments: {
            type: Sequelize.STRING
        },
        links: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false
    }
)
