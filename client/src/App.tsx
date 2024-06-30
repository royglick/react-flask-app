// import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import P5LiquidWords from "./p5js/P5LiquidWords/P5LiquidWords";

switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = "https://roy-glick.com";
    break;
  case "development":
    axios.defaults.baseURL = "http://localhost:5001";
    break;
}

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <P5LiquidWords
          width={window.innerWidth}
          height={window.innerHeight}
          word={"HELLO"}
        />
      </div>
    </div>
  );
}
export default App;
