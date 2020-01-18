const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
    "line_objects", {
        id_line_object: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        coordinates: {
            type: Sequelize.GEOMETRY('LINESTRING')
        },
        id_point_one: {
            type: Sequelize.INTEGER
        },
        id_point_two: {
            type: Sequelize.INTEGER
        },
        id_contract: {
            type: Sequelize.INTEGER
        },
        links: {
            type: Sequelize.STRING
        },
        comments: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    }
)