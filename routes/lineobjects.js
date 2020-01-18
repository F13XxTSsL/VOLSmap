const express = require("express")
const router = express.Router()
const lineObjects = require("../models/lineobjects/lineobjects")
// const contract = require("../models/cotracts/contracts")

//Get All Contracts
router.get("/line_objects", (req, res) => {
    lineObjects.findAll()
        .then(lineObjects => {
            console.log(lineObjects)
            res.json(lineObjects)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


module.exports = router