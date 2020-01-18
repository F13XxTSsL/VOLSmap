const express = require("express")
const router = express.Router()
const objects = require("../models/objects/objects")
const contract = require("../models/cotracts/contracts")

//Get All Contracts
router.get("/object", (req, res) => {
    objects.findAll()
        .then(objects => {
            res.json(objects)
        })
        .catch(err => {
            res.send("error: " + err)
        })

})
router.get("/object/:id", (req, res) => {
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