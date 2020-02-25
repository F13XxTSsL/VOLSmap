const express = require("express")
const router = express.Router()
const lineObjectsAllData = require("../models/lineobjects/lineobjectsAllData")
const object = require("../models/objects/objects")
const contract = require("../models/cotracts/contracts")
const users_data = require("../models/users/users_data")

router.get("/line_objects_all", (req, res) => {
  lineObjectsAllData.findAll()
    .then(lineObjectsAllData => {
      res.json(lineObjectsAllData)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

router.get("/line_objects_all_contract", (req, res) => {
  contract.findAll()
  .then(contract => {
    res.json(contract)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

router.get("/line_objects_all_object", (req, res) => {
  object.findAll()
  .then(object => {
    res.json(object)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

router.post("/line_objects_all", (req, res) => {
  console.log(req.body)
  if(!req.body) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    lineObjectsAllData.create(req.body)
      .then((res) => {
        res.send('Object Added')
      }).catch(err => {
      res.send("Error: " + err)
    })
  }
})

router.delete("/line_objects_all/:id", (req, res) => {
  lineObjectsAllData.destroy({
    where: {
      id_line_object: req.params.id
    }
  })
  .then((res) => {
    res.send('Objects Deleted!')
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

router.get("/line_objects_all_one/:id", (req, res) => {
  object.findOne({
    where: {
      id_object: req.params.id
    }
  })
      .then((object) => {
        res.json(object)
      })
      .catch(err => {
        res.send("error" + err)
      })
})

router.get("/line_objects_all_two/:id", (req, res) => {
  object.findOne({
    where: {
      id_object: req.params.id
    }
  })
      .then((object) => {
        res.json(object)
      })
      .catch(err => {
        res.send("error" + err)
      })
})

router.get("/line_objects_all_rent/:id", (req, res) => {
  contract.findOne({
    where: {
      id_contract: req.params.id
    }
  })
      .then((rent) => {
        res.json(rent)
      })
      .catch(err => {
        res.send("error" + err)
      })
})

router.get("/line_objects_all_responsible/:id", (req, res) => {
    users_data.findOne({
        where: {
            id_user: req.params.id
        }
    })
        .then((responsible) => {
            res.json(responsible)
        })
        .catch(err => {
            res.send("error" + err)
        })
})

module.exports = router
