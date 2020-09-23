import React, { useState, useEffect } from 'react';

const TodoForm = (props) => {
  const handleClick = () => {
    const task = document.getElementById('task').value
    console.log(task)
    const reqOpts = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        task: String(task),
        hasCompleted: "false"
      })
    }

    fetch('/api/todos', reqOpts)
    .then(r => console.log("Successful POST req" + r))
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