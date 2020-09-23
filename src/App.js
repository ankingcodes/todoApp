import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todo, setTodo] = useState('')

  useEffect(() => {
    console.log("before fetch")
    console.log(fetch('http://localhost:9999/api/allTodos', {
      method: 'GET'
    }))
    console.log("After fetch")
  })

  return (
    <div className="App">
        <p>
          {todo}
        </p>
    </div>
  );
}

export default App;