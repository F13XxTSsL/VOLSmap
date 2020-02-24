const express = require("express")
const router = express.Router()
const objects = require("../models/objects/objects")
const contract = require("../models/cotracts/contracts")
const users_data = require("../models/users/users_data")
const partners = require("../models/partners/partners")

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

router.get("/objects_contract", (req, res) => {
    contract.findAll()
        .then(contract => {
            res.json(contract)
        })
        .catch(err => {
            res.send("error: " + err)
        })

})

router.get("/objects_contract/:id", (req, res) => {
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
router.get("/objects_partner/:id", (req, res) => {
    partners.findOne({
        where: {
            id_partner: req.params.id
        }
    })
        .then((partners) => {
            res.json(partners)
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
        comments: req.body.comments,
        status: req.body.status,
        name_obj: req.body.name_obj,
        data_for_exploitation: req.body.data_for_exploitation,
        links: req.body.links,
        adress: req.body.adress
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
router.get("/objects_responsible/:id", (req, res) => {
    users_data.findOne({
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