import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { discoverMoviesRequest } from './actions';
import Navigation from './Navigation';
import NotificationContainer from './components/NotificationContainer';
import Discover from './pages/Discover';
import Search from './pages/Search';
import Queues from './pages/Queues';
import Home from './pages/Home';
import './custom.scss';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(discoverMoviesRequest());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <NotificationContainer />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/discover`}>
            <Discover />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/search`}>
            <Search />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/queues`}>
            <Queues />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
