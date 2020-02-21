const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
    "contracts", {
        id_contract: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        data: {
            type: Sequelize.DATE
        },
        id_partner: {
            type: Sequelize.INTEGER,
        },
        links: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.STRING
        },
        rent: {
            type: Sequelize.FLOAT
        },
        placement: {
            type: Sequelize.STRING
        },
        responsible: {
          type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
)
