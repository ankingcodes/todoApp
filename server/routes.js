const express = require('express')
const router = express.Router()
const db = require('./db')
const mongoose = require('mongoose')

// get all todos
router.get('/todos', (req, res, next) => {
  console.log(req.body)
  db.find().select('_id task hasCompleted').exec()
  .then(todo => {
    const response = {
      count: todo.length,
      todo: todo.map(todo => {
        return {
          _id: todo._id,
          task: todo.task,
          hasCompleted: !todo.hasCompleted,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/api/todo/' + todo._id
          }
        }
      })
    }
    res.status(200).send(response);
  })
  .catch(err => res.status(500).json({ error: err }))
})

// post one todo
router.post('/todos', async (req, res, next) => {
  const todo = await new db({
    _id: new mongoose.Types.ObjectId(),
    task: req.body.task,
    hasCompleted: req.body.hasCompleted
  })
  return todo.save().then(() => {
    res.status(200).send(`Posted Todo \n ${todo}`)
  }).catch((e) => e.message)
})

// get one todo
router.get('/todos/:todoId', (req, res, next) => {

})

module.exports = router