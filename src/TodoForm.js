import React, { useState, useEffect } from 'react';

const TodoForm = (props) => {
  const handleClick = () => {
    const task = document.getElementById('task').value
    const reqOpts = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        task: String(task),
        hasCompleted: Boolean(false)
      })
    }

    fetch('/api/todos', reqOpts)
    .then(r => {
      console.log(r)
      console.log("Successful POST req" + r.body)
      const task = document.getElementById('task')
      task.value = ""
      props.update()
    })
    .catch(e => console.log(e))
  }

  return(
    <div>
      <label>Task: </label>
      <input id="task" type="text" placeholder="Add todo here..."/>
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default TodoForm;