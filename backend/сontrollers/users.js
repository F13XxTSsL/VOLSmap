const express = require("express")
const router = express.Router()
const user = require("../models/users/users")
const user_data = require("../models/users/users_data")
const all_user_data = require("../models/users/all_user_data")

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

router.get("/profile_all", (req, res) => {
    all_user_data.findAll()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

router.post("/profile_all", (req, res) => {
    if (!req.body.id_user) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        all_user_data.create(req.body)
            .then((res) => {
                res.send('Profile Added')
            }).catch(err => {
            res.send("Error: " + err)
        })
    }
})

router.delete("/profile_all/:id", (req, res) => {
    all_user_data.destroy({
        where: {
            id_user: req.params.id
        }
    })
        .then((res) => {
            res.send('Profile Deleted!')
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

router.put("/profile_all/:id", (req, res) => {
    if (!req.body.id_user) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        all_user_data.update(
            {
                id_user: req.body.id_user,
                login: req.body.login,
                password: req.body.password,
                profile_status: req.body.profile_status,
                fio: req.body.fio,
                phone_number: req.body.phone_number,
                email: req.body.email,
                position: req.body.position,
                subdivision: req.body.subdivision
            },
            {where: {id_user: req.params.id}},
        )
            .then(() => {
                res.send('Profile Updated')
            })
            .error(err => res.send(err))
    }
})
module.exports = router