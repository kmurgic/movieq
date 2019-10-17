import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { topMoviesRequest } from './actions';

import Navigation from './Navigation';
import Queues from './pages/Queues';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './custom.scss';
import './App.css';

function App() {
  const movieList = useSelector((state) => state.movies.list);
  console.log(movieList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topMoviesRequest());
  }, [dispatch]);

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
