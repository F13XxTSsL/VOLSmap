const express = require("express")
const router = express.Router()
const lineObjects = require("../models/lineobjects/lineobjects")
const contract = require("../models/cotracts/contracts")
const partner = require("../models/partners/partners")
const user_data = require("../models/users/users_data")

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

router.get("/line_objects_contract/:id", (req, res) => {
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

router.get("/line_objects_partner/:id", (req, res) => {
  partner.findOne({
    where: {
      id_partner: req.params.id
    }
  })
      .then((partner) => {
        res.json(partner)
      })
      .catch(err => {
        res.send("error" + err)
      })
})

router.get("/objects_line_responsible/:id", (req, res) => {
    user_data.findOne({
        where: {
            id_user: req.params.id
        }
    })
        .then((user) => {
            res.json(user)
        })
        .catch(err => {
            res.send("error" + err)
        })
})


module.exports = router