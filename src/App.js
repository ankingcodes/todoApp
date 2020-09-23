import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todo, setTodo] = useState({
    todos: [],
    totalTodos: 0
  })

  useEffect(() => {
    const url = "/api/todos"
    fetch(url)
    .then(res => res.json())
    .then(data => {
      let todos = []
      let count = 0
      data.todo.map(r => {
        todos.push({
          task: r.task,
          hasCompleted: r.hasCompleted
        })
        count = count + 1
      })
      setTodo({
        todos: todos,
        totalTodos: count
      })
    })
    .catch((e) => console.log("Unable to fetch", e))
  })

  return (
    <div className="App">
      <h2>TODO LIST</h2>
      <TodoForm />
      <TodoList
      todos={todo.todos}
      count={todo.totalTodos}
      />
    </div>
  );
}

export default App;