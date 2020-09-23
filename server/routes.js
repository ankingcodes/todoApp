const express = require('express')
const router = express.Router()
const db = require('./db')
const mongoose = require('mongoose')

// get all todos "custom response"
router.get('/todos', (req, res, next) => {
  db.find().select('_id task hasCompleted').exec()
  .then(todo => {
    res.status(200).send(todo);
  })
  .catch(err => res.status(500).json({ error: err }))
})

// post one todo "promise style"
router.post('/todos', async (req, res, next) => {
  console.log(req.body.hasCompleted)
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

// get one todo by searching by todoName
router.get('/todo/:todoName', async (req, res, next) => {
  try{
    console.log(req.params.todoName)
    const todo = await db.find({"task":req.params.todoName}).exec()
    res.status(200).json(todo)
  } catch(e) {
    res.status(400).send("Error fetching todo. " + e)
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

//delete a todo by todo name
router.delete('/todo/:todoName', async (req, res) => {
  try{
    const todos = await db.findOneAndDelete({
      task: req.params.todoName
    }).exec()
    res.status(200).send(todos)
  } catch(e){
    res.status(400).send("Error ! Cannot delete todo by name")
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

// update hasCompleted to opposite of current value
router.patch('/todo/:todoName', async (req,res) => {
  try{
    console.log(req.body)
    const todos = await db.findOneAndUpdate({
      task: req.params.todoName
    }, req.body)
    res.status(200).send(todos)
  } catch(e) {
    res.status(400).send("Error! Cannot toggle hasCompleted !")
  }
})
module.exports = router