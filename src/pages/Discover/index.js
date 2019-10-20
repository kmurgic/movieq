import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Form from 'react-bootstrap/Form';
import MovieCardContainer from '../../components/MovieCardContainer';
import { ratings, genres } from './selectOptions';
import classes from './index.module.css';

const Discover = () => {
  const { error, firstLoad, isLoading, movies } = useSelector(state => state.discover, shallowEqual);
  const thisYear = new Date().getFullYear();
  const yearsSince1900 = thisYear - 1900;

  return (
    <>
      <Form className="d-flex justify-content-center flex-wrap">
        <Form.Group className={`${classes['form_group']}`} controlId="select-max_genre">
          <Form.Label>
            Genre
          </Form.Label>
          <Form.Control size="lg" as="select">
            {genres.map((genre) => {
              return (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              )
            })}
          </Form.Control>
        </ Form.Group>
        <Form.Group className={`${classes['form_group']}`} controlId="select-before_year">
          <Form.Label>
            Max Year
          </Form.Label>
          <Form.Control size="lg" as="select">
            {/* Add options for all the years from 1900 until now */}
            {[...Array(yearsSince1900 + 1)].map((_, yearsAgo) => {
              return (
                <option key={yearsAgo} value={thisYear - yearsAgo}>
                  {(thisYear - yearsAgo).toString()}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className={`${classes['form_group']}`} controlId="select-after_year">
          <Form.Label>
            Min Year
          </Form.Label>
          <Form.Control size="lg" as="select">
            {/* Add options for all the years from 1900 until now */}
            {[...Array(yearsSince1900 + 1)].map((_, yearsAgo) => {
              return (
                <option key={yearsAgo} value={thisYear - yearsAgo}>
                  {(thisYear - yearsAgo).toString()}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className={`${classes['form_group']}`} controlId="select-max_rating">
          <Form.Label>
            Max Rating
          </Form.Label>
          <Form.Control size="lg" as="select">
            {ratings.map((rating) => {
              return (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group className={`${classes['form_group']}`} controlId="select-min_rating">
          <Form.Label>
            Min Rating
          </Form.Label>
          <Form.Control size="lg" as="select">
            {/* Add options for all the years from 1900 until now */}
            {ratings.map((rating) => {
              return (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              )
            })}
          </Form.Control>
        </Form.Group>
      </Form>
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
