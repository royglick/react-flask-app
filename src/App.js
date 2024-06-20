import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // fetch('/api/time').then(res => res.json()).then(data => {
    //   setCurrentTime(data.time);
    // });
    fetch('/api/time ').then(res => console.log(res)).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <BrowserRouter>
          <div>
            <Link className="App-link" to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className="App-link" to="/page2">Page2</Link>
          </div>
          <Routes>
            <Route exact path="/">
              <React.Fragment>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <p>The current time is {currentTime}.</p>
              </React.Fragment>
            </Route>
            <Route path="/page2">
                <p>This is page 2!</p>
            </Route>
          </Routes>
        </BrowserRouter> */}
      </header>
    </div>
  );
}

export default App;
