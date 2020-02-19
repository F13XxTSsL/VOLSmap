const express = require("express")
const router = express.Router()
const lineObjectsAllData = require("../models/lineobjects/lineobjectsAllData")


router.get("/line_objects_all", (req, res) => {
  lineObjectsAllData.findAll()
    .then(lineObjectsAllData => {
      res.json(lineObjectsAllData)
    })
    .catch(err => {
      res.send("error: " + err)
    })
})

router.post("/line_objects_all", (req, res) => {
  if(!req.body) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    lineObjectsAllData.create(req.body)
      .then((res) => {
        console.log(req.body)
        res.send('Object Added')
      }).catch(err => {
      res.send("Error: " + err)
    })
  }
})

module.exports = router
