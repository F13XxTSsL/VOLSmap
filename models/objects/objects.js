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
    status: {
      type: Sequelize.STRING
    },
    name_obj: {
      type: Sequelize.STRING
    },
    data_for_exploitation: {
      type: Sequelize.DATE
    },
    links: {
      type: Sequelize.STRING
    },
    adress: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  }
)