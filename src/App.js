import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodo] = useState([])

  useEffect(() => {
    fetch('/api/todos')
    .then(res => {
      console.log("Successfully fetched todos !!!" + res)
      return res.json()
    })
    .then(r => {
      console.log(r)
      setTodo(todos => todos.concat(r))
    })
    .catch(e => console.log(e))
  },[])

  const updateState = () => {
    todos.length = 0
    fetch('/api/todos')
    .then(res => res.json())
    .then(r => setTodo(todos => todos.concat(r)))
    .catch(e => console.log(e))
  }

  return (
    <div className="App">
      <h2>TODO LIST</h2>
      <TodoForm update={updateState.bind(this)}/>
      <TodoList todos={todos} update={updateState.bind(this)}/>
    </div>
  );
}

export default App;