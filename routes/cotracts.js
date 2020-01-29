const express = require("express")
const router = express.Router()
const contracts = require("../models/cotracts/contracts")

//Get All Contracts
router.get("/contracts", (req, res) => {
    contracts.findAll()
        .then(contracts => {
            res.json(contracts)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})
//ADD Contracts
router.post("/contracts", (req, res) => {
    if(!req.body.id_contract) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        contracts.create(req.body)
            .then((res) => {
                res.send('Contracts Added')
            }).catch(err => {
                res.send("Error: " + err)
        })
    }
})

//Delete Contracts
router.delete("/contracts/:id", (req, res) => {
    contracts.destroy({
        where: {
            id_contract: req.params.id
        }
    })
        .then((res) => {
            res.send('Contracts Deleted!')
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

//Update Contracts
router.put("/contracts/:id", (req, res) => {
    if(!req.body.id_contract) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        contracts.update(
            {id_contract: req.body.id_contract,
                data: req.body.data,
                id_partner: req.body.id_partner,
                links: req.body.links,
                comments: req.body.comments,
                rent: req.body.rent,
                placement: req.body.placement,
                responsible: req.body.responsible
            },
            {where: {id_contract: req.params.id}},
        )
            .then(() => {
                res.send('Contracts Updated')
            })
            .error(err => res.send(err))
    }
})

module.exports = router