import React, {useEffect, useState } from 'react';

const TodoList = (props) => {
  const handleClick = (taskName) => {
    fetch('/api/todo/' + taskName, {
      method: 'DELETE'
    })
    .then(() => console.log("Deleted Todo"))
    .catch((e) => console.log("Error deleting todo "+e))
  }

  const toggle = (taskName, toggleVal) => {
    console.log(taskName, toggleVal)
    const reqOpts = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        hasCompleted: !toggleVal
      })
    }
    console.log('/api/todo/'+taskName)
    console.log(reqOpts)
    fetch('/api/todo/' + taskName, reqOpts)
    .then((r) => console.log("Toggled successfully !" + r))
    .catch((e) => console.log("Error Toggling." + e))
  }

  return(
    <div>
      <p>Total tasks: {props.count}</p>
      <ul>
        {props.todos.map((t) => (
        <div>
          {
            t.hasCompleted ? (
              <li
                style={{listStyle: 'none'}}
                onClick={() => toggle(t.task, t.hasCompleted)}
               >
                {t.task}
                <span
                  onClick={() => handleClick(t.task)}
                  style={{paddingLeft: '40px'}}
                >x</span>
              </li>
            ) : (
              <li
                style={{listStyle: 'none', textDecoration: 'line-through'}}
                onClick={() => toggle(t.task, t.hasCompleted)}
               >
                {t.task}
                <span
                  onClick={() => handleClick(t.task)}
                  style={{paddingLeft: '40px'}}
                >x</span>
              </li>

            )
          }
        </div>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;