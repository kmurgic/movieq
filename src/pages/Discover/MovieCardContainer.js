import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CardDeck from 'react-bootstrap/CardDeck';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from './MovieCard';
import classes from './index.module.css';

const MovieCardContainer = () => {
  const { list, isLoading, error } = useSelector(state => state.movies, shallowEqual);
  if (isLoading) return (
    <Spinner
      animation="border"
      variant="primary"
      className={`${classes.spinner} ml-auto mr-auto d-inline-block`}
    />
  );
  if (error) return (
    <p>We're sorry, something went wrong.  Please try refreshing your browser.</p>
  )

  if (list.length === 0) return (
    <p>Your search did not match any movies.</p>
  )

  const shortList = list.slice(0, 12);

  return (
    <CardDeck className="d-flex justify-content-center flex-wrap mt-4">
      {shortList.map(movieData => (
        <MovieCard
          key={movieData.id}
          overview={movieData.overview}
          posterPath={movieData.poster_path}
          releaseDate={movieData.release_date}
          title={movieData.title}
        />
      ))
      }
    </CardDeck>
  );
}

export default MovieCardContainer;
