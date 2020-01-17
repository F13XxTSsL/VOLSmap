const express = require("express")
const router = express.Router()
const objects = require("../models/objects/objects")

//Get All Contracts
router.get("/home", (req, res) => {
  objects.findAll()
    .then(objects => {
      res.json(objects)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

module.exports = router