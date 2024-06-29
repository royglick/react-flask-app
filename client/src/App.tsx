import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


switch(process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'https://roy-glick.com';
    break;
  case 'development':
    axios.defaults.baseURL = 'http://localhost:5001';
    break;
}

function App() {

  return (
   <div className="App">
    <div className="navbar">
     <ul>
      <li>Hi</li>
     </ul>
    </div>
   </div>
  )
 }
 export default App