import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import MovieCardContainer from '../../components/MovieCardContainer';
import DiscoverForm from './DiscoverForm';


const Discover = () => {
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.discover, shallowEqual);

  return (
    <>
      <DiscoverForm />
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
