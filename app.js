const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3000

const partners = require('./routes/partners')
const contracts = require('./routes/cotracts')
const objects = require('./routes/objects')
const lineObjects = require('./routes/lineobjects')
const Login = require('./routes/users')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', partners, contracts, objects, lineObjects, Login)


app.listen(PORT, function() {
    console.log('Server start ' + PORT)
})