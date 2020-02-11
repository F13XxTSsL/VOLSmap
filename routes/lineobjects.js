const express = require("express")
const router = express.Router()
const lineObjects = require("../models/lineobjects/lineobjects")
const contract = require("../models/cotracts/contracts")

//Get All Contracts
router.get("/line_objects", (req, res) => {
  lineObjects.findAll()
    .then(lineObjects => {
      res.json(lineObjects)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

router.get("/line_objects/:id", (req, res) => {
  contract.findOne({
    where: {
      id_contract: req.params.id
    }
  })
    .then((contract) => {
      res.json(contract)
    })
    .catch(err => {
      res.send("error" + err)
    })
})


module.exports = router