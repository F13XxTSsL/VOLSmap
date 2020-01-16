const express = require("express")
const router = express.Router()
const partner = require("../models/partners/partners")

//Get All Partner
router.get("/partners", (req, res) => {
    partner.findAll()
        .then(partners => {
            res.json(partners)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//ADD Partner
router.post("/partners", (req, res) => {
    if(!req.body.id_partner) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        partner.create(req.body)
            .then((res) => {
                res.send('Partner Added')
            }).catch(err => {
                res.send("Error: " + err)
            })
    }
})

//Delete Partner
router.delete("/partners/:id", (req, res) => {
    console.log(req.params)
    partner.destroy({
        where: {
            id_partner: req.params.id
        }
    })
        .then(() => {
            res.send('Partner Deleted!')
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Partner
router.put("/partners/:id", (req, res) => {
    console.log(req.body)
    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        partner.update(
            {name: req.body.name,
            INN: req.body.INN,
            contacts: req.body.contacts,
            comments: req.body.comments,
            links: req.body.links
            },
            {where: {id_partner: req.params.id}},
        )
            .then(() => {
                res.send('Partner Updated')
            })
            .error(err => res.send(err))
    }
})

module.exports = router