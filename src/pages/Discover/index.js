import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import MovieCardContainer from '../../components/MovieCardContainer';
import DiscoverForm from './DiscoverForm';
import PageNavigation from '../../components/PageNavigation';

const Discover = () => {
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.discover, shallowEqual);
  const [page, setPage] = useState(1);

  const moviesToDisplay = movies.slice((page - 1) * 12, page * 12);
  const totalPages = Math.ceil(movies.length / 12);

  return (
    <>
      <DiscoverForm />
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

export default Discover;
