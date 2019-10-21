import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = () => {
  return (
    <Redirect to={`${process.env.PUBLIC_URL}/discover`} />
  )
}

export default Home;
