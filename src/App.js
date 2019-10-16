import React from 'react';
import './App.css';
import Navigation from './Navigation';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <h1>Welcome to Movie Q!</h1>
      </div>
    </Router>
  );
}

export default App;
