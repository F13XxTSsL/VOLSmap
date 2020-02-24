const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')



const partners = require('./сontrollers/partners')
const contracts = require('./сontrollers/cotracts')
const objects = require('./сontrollers/objects')
const lineObjects = require('./сontrollers/lineobjects')
const lineObjectsAllData = require('./сontrollers/lineobjectsAlldata')
const Login = require('./сontrollers/users')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', partners, contracts, objects, lineObjects, lineObjectsAllData, Login)

const PORT = 3000

app.listen(PORT, function() {
    console.log('Server start ' + PORT)
})