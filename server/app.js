const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 9999
const todoRoutes = require('./routes')
const mongoose = require('mongoose')

// setup database
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true
})

// bodyParser required to read req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// starts listening
app.listen(port, () => {
  console.log(`Server started at ${port}`)
})

// routes for todos
app.use('/api', todoRoutes)