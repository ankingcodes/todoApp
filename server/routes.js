const express = require('express')
const router = express.Router()
const db = require('./db')
const mongoose = require('mongoose')

// get all todos "custom response"
router.get('/todos', (req, res, next) => {
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

// post one todo "promise style"
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

// get one todo "async await style"
router.get('/todos/:todoId', async (req, res, next) => {
  try{
    const todos = await db.findById(req.params.todoId).exec()
    res.status(200).json(todos)
  } catch(e) {
    res.status(400).send("Error fetching todos.")
  }
})

// delete a todo with an id
router.delete('/todos/:todoId', async (req, res, next) => {
  try{
    const todos = await db.deleteOne({
      _id: req.params.todoId
    })
    res.status(200).send(todos)
  } catch(e) {
    res.status(400).send("Error! Cannot delete todo")
  }
})

// update / replace task of a todo
router.patch('/todos/:todoId', async (req, res, next) => {
  try{
    const todos = await db.findByIdAndUpdate({
      _id: req.params.todoId
    }, req.body)
    res.status(200).send(todos)
  } catch(e) {
    res.status(400).send("Error! Cannot update todo")
  }
})

module.exports = router