import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import SearchBar from './SearchBar';
import { searchMoviesRequest } from '../../actions';
import MovieCardContainer from '../../components/MovieCardContainer';

const Search = () => {
  const dispatch = useDispatch();
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.search, shallowEqual);
  const handleSearch = (query) => {
    dispatch(searchMoviesRequest(query));
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <MovieCardContainer
        error={!!error}
        firstLoad={firstLoad}
        isLoading={isLoading}
        movies={movies}
      />
    </>
  );
};

export default Search;
