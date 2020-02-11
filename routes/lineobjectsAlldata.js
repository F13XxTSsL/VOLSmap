const express = require("express")
const router = express.Router()
const lineObjectsAllData = require("../models/lineobjects/lineobjectsAllData")


router.get("/line_objects_all", (req, res) => {
  lineObjectsAllData.findAll()
    .then(lineObjectsAllData => {
      res.json(lineObjectsAllData)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

module.exports = router
