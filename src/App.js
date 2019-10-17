import React from 'react';
import './App.css';
import Navigation from './Navigation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Queues from './Queues';
import Discover from './Discover';
import Home from './Home';
import Profile from './Profile';
import './custom.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/discover">
            <Discover />
          </Route>
          <Route path="/queues">
            <Queues />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
