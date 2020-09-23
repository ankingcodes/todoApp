import React, {useEffect, useState } from 'react';

const TodoList = (props) => {
  const handleClick = (taskName, props) => {
    fetch('/api/todo/' + taskName, {
      method: 'DELETE'
    })
    .then(() => {
      console.log("Deleted Todo")
      props.update()
    })
    .catch((e) => console.log("Error deleting todo "+e))
  }

  const toggle = (taskName, toggleVal, props) => {
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
    .then((r) => {
      console.log("Toggled successfully !" + r)
      console.log(props)
      props.update()
    })
    .catch((e) => console.log("Error Toggling." + e))
  }

  return(
    <div>
      <p> Tasks: {props.todos.length} </p>
      <ul>
        {props.todos.map((t) => (
        <div>
          {
            !t.hasCompleted ? (
              <li
                style={{listStyle: 'none'}}
               >
                <span onClick={() => toggle(t.task, t.hasCompleted, props)}>{t.task}</span>
                <span
                  onClick={() => handleClick(t.task, props)}
                  style={{paddingLeft: '40px'}}
                >x</span>
              </li>
            ) : (
              <li
                style={{listStyle: 'none', textDecoration: 'line-through'}}
               >
                <span onClick={() => toggle(t.task, t.hasCompleted, props)}>{t.task}</span>
                <span
                  onClick={() => handleClick(t.task, props)}
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