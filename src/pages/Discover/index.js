import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import MovieCardContainer from '../../components/MovieCardContainer';

const Discover = () => {
  const { list, isLoading, error } = useSelector(state => state.movies, shallowEqual);

  return (
    <>
      <MovieCardContainer
        error={error}
        isLoading={isLoading}
        movies={list}
      />
    </>
  );
};

export default Discover;
