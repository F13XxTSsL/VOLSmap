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
    id_contract: {
      type: Sequelize.INTEGER
    },
    coordinates: {
      type: Sequelize.GEOMETRY('LINESTRING')
    },
    status: {
      type: Sequelize.STRING
    },
    placement: {
      type: Sequelize.STRING
    },
    links: {
      type: Sequelize.STRING
    },
    comments: {
      type: Sequelize.STRING
    },

  },
  {
    timestamps: false
  }
)