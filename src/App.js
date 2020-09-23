import React, { useEffect, useState } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [todo, setTodo] = useState({})

  useEffect(() => {
    const url = "http://localhost:9999/api/todos"
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((e) => console.log("Unable to fetch", e))
    axios.get(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch((e) => console.log("Unable to fetch", e))
  })

  return (
    <div className="App">
        <p>
          TODO
        </p>
    </div>
  );
}

export default App;