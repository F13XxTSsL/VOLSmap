const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const partners = require('./routes/partners')
const contracts = require('./routes/cotracts')
const objects = require('./routes/objects')
const lineObjects = require('./routes/lineobjects')

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', partners, contracts, objects, lineObjects)

app.listen(PORT, function() {
    console.log('Server start ' + PORT)
})