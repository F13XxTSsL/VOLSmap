const Sequelize = require("sequelize")
const db = require("../../database/database.js")

module.exports = db.sequelize.define(
  "objects", {
    id_object: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    type: {
      type: Sequelize.STRING
    },
    coordinates: {
      type: Sequelize.GEOMETRY('POINT')
    },
    id_obj_contract: {
      type: Sequelize.INTEGER
    },
    comments: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false
  }
)