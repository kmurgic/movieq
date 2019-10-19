import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMoviesRequest } from './actions';
import Navigation from './Navigation';
import Queues from './pages/Queues';
import Discover from './pages/Discover';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './custom.scss';
import './App.css';
import Search from './pages/Search';
import NotificationContainer from './components/NotificationContainer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesRequest());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <NotificationContainer />
        <Switch>
          <Route path="/discover">
            <Discover />
          </Route>
          <Route path="/search">
            <Search />
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
