import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import MovieCardContainer from '../../components/MovieCardContainer';

const Discover = () => {
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.discover, shallowEqual);

  return (
    <>
      <MovieCardContainer
        error={!!error}
        firstLoad={firstLoad}
        isLoading={isLoading}
        movies={movies}
      />
    </>
  );
};

export default Discover;
