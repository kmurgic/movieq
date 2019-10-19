import React from 'react';
import PropTypes from 'prop-types';
import CardDeck from 'react-bootstrap/CardDeck';
import Spinner from 'react-bootstrap/Spinner';
import MovieCard from '../MovieCard';
import classes from './index.module.css';

const MovieCardContainer = (props) => {
  const { error, firstLoad, isLoading, movies } = props;
  if (isLoading) return (
    <Spinner
      animation="border"
      variant="primary"
      className={`${classes.spinner} ml-auto mr-auto d-block`}
    />
  );

  if (error) return (
    <p>We're sorry, something went wrong.  Please try refreshing your browser.</p>
  );

  if (movies.length === 0 && firstLoad) return (<></>);

  if (movies.length === 0) return (
    <p>Your search did not match any movies.</p>
  );

  const shortList = movies.slice(0, 12);

  return (
    <CardDeck className="d-flex justify-content-center flex-wrap mt-4">
      {shortList.map(movieData => (
        <MovieCard
          key={movieData.id}
          overview={movieData.overview}
          movieId={movieData.id}
          posterPath={movieData.poster_path}
          releaseDate={movieData.release_date}
          title={movieData.title}
        />
      ))
      }
    </CardDeck>
  );
};

MovieCardContainer.propTypes = {
  error: PropTypes.bool.isRequired,
  firstLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MovieCardContainer;
