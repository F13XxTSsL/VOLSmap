const express = require("express")
const router = express.Router()
const objects = require("../models/objects/objects")
const contract = require("../models/cotracts/contracts")

//Get All Contracts
router.get("/objects", (req, res) => {
    objects.findAll()
        .then(objects => {
            res.json(objects)
        })
        .catch(err => {
            res.send("error: " + err)
        })

})
router.get("/objects/:id", (req, res) => {
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

router.post("/objects", (req, res) => {
  if(!req.body.id_object) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    objects.create(req.body)
      .then((res) => {
        res.send('Object Added')
      }).catch(err => {
      res.send("Error: " + err)
    })
  }
})

router.put("/objects/:id", (req, res) => {
  if(!req.body.id_object) {
    res.status(400)
    res.json({
      error: "Bad Data"
    })
  } else {
    objects.update(
      {id_object: req.body.id_object,
        type: req.body.type,
        coordinates: req.body.coordinates,
        id_obj_contract: req.body.id_obj_contract,
        comments: req.body.comments,
        status: req.body.status,
      },
      {where: {id_object: req.params.id}},
    )
      .then(() => {
        res.send('Objects Updated')
      })
      .error(err => res.send(err))
  }
})

router.delete("/objects/:id", (req, res) => {
  objects.destroy({
    where: {
      id_object: req.params.id
    }
  })
    .then((res) => {
      res.send('Objects Deleted!')
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

module.exports = router