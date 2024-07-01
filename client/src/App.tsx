// import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import P5LiquidWords from "./p5js/P5LiquidWords/P5LiquidWords";
import P5Paragraph from "./p5js/P5Buttons/P5Paragraph";

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
      <div id="p5liquidiv">
        <P5LiquidWords width={window.innerWidth} height={450} word={"HELLO"} />
      </div>
      <div id="p5sentencediv">
        <P5Paragraph width={window.innerWidth} height={400} />
      </div>
    </div>
  );
}
export default App;
