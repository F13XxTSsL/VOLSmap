const express = require("express")
const router = express.Router()
const user = require("../models/users/users")
const user_data = require("../models/users/users_data")
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')


router.use(cors())

let SECRET_KEY = 'secret'

router.post("/login", (req, res) => {
    user.findOne({
        where: {
            login: req.body.login,
            password: req.body.password
        }
    })
        .then(user => {
            if(user) {
                const isValid = bCrypt.compare(req.body.password, user.password)
                if(isValid) {
                    const token = jwt.sign(user.login, SECRET_KEY)
                    res.json({status_user: user.profile_status,token})
                }
            } else {
                res.status(400).json({message: 'Данные не верны!'})
            }
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
})

router.get("/profile/:id", (req, res) => {
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