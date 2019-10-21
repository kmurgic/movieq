import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import classes from './index.module.css';
import { genres, ratings } from './selectOptions';
import { discoverMoviesRequest } from '../../actions';

const initialFilters = {
  genre: 'Any',
  maxYear: 'Any',
  minYear: 'Any',
  maxRating: 'Any',
  minRating: 'Any',
};

const DiscoverForm = (props) => {
  const { setPage } = props;
  const thisYear = new Date().getFullYear();
  const yearsSince1900 = thisYear - 1900;
  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    const { name, value } = e.currentTarget;
    const newFilters = { ...filters, [name]: value };
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    dispatch(discoverMoviesRequest(newFilters));
    setPage(1);
  };

  return (
    <Form className="d-flex justify-content-center flex-wrap">
      <Form.Group className={`${classes['form_group']}`} controlId="select-max_genre">
        <Form.Label>
          Genre
        </Form.Label>
        <Form.Control
          size="lg"
          as="select"
          name="genre"
          onChange={handleOptionChange}
          value={filters.genre}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
          {genres.map((genre) => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            )
          })}
        </Form.Control>
      </ Form.Group>
      <Form.Group className={`${classes['form_group']}`} controlId="select-before_year">
        <Form.Label>
          Max Year
        </Form.Label>
        <Form.Control
          size="lg"
          as="select"
          name="maxYear"
          onChange={handleOptionChange}
          value={filters.maxYear}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
          {/* Add filters for all the years from 1900 until now */}
          {[...Array(yearsSince1900 + 1)].map((_, yearsAgo) => {
            return (
              <option key={yearsAgo} value={(thisYear - yearsAgo).toString()}>
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
        <Form.Control
          size="lg"
          as="select"
          name="minYear"
          onChange={handleOptionChange}
          value={filters.minYear}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
          {/* Add filters for all the years from 1900 until now */}
          {[...Array(yearsSince1900 + 1)].map((_, yearsAgo) => {
            return (
              <option key={yearsAgo} value={(thisYear - yearsAgo).toString()}>
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
        <Form.Control
          size="lg"
          as="select"
          name="maxRating"
          onChange={handleOptionChange}
          value={filters.maxRating}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
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
  )
};

DiscoverForm.propsTypes = {
  setPage: PropTypes.func.isRequired,
};

export default DiscoverForm;
