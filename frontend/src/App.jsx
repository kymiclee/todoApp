import React from 'react'
import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar';
import TodoLists from './components/TodoLists'
import TodoItems from './components/TodoItems'

function App() {

  return (
    <div className='App'>
      <div className='NavBar'>
        <NavBar />
      </div>
      <div className='dateBox'>

      </div>
      <div className="Todo">
        <div className='TodoList'>
          <TodoLists />
        </div>
        <div className='TodoItems'>
          <TodoItems />
        </div>
      </div>
    </div>

  )
}

export default App
