import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import SearchBar from './SearchBar';
import { queryMoviesRequest } from '../../actions';
import MovieCardContainer from '../../components/MovieCardContainer';
import PageNavigation from '../../components/PageNavigation';

const Search = () => {
  const dispatch = useDispatch();
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.search, shallowEqual);
  const handleSearch = (query) => {
    dispatch(queryMoviesRequest(query));
  };

  const [page, setPage] = useState(1);
  const moviesToDisplay = movies.slice((page - 1) * 12, page * 12);
  const totalPages = Math.ceil(movies.length / 12);

  return (
    <>
      <SearchBar handleSearch={handleSearch} />
      <MovieCardContainer
        error={!!error}
        firstLoad={firstLoad}
        isLoading={isLoading}
        movies={moviesToDisplay}
      />
      {totalPages > 1 && (
        <PageNavigation
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Search;
