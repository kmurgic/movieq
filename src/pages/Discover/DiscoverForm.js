import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import classes from './index.module.css';
import { genres, ratings } from './selectOptions';

const initialOptions = {
  genre: 'Any',
  maxYear: 'Any',
  minYear: 'Any',
  maxRating: 'Any',
  minRating: 'Any',
};

const DiscoverForm = () => {
  const thisYear = new Date().getFullYear();
  const yearsSince1900 = thisYear - 1900;

  const [options, setOptions] = useState(initialOptions);

  const handleOptionChange = (e) => {
    const { name, value } = e.currentTarget;
    setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
  }

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
          value={options.genre}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
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
        <Form.Control
          size="lg"
          as="select"
          name="maxYear"
          onChange={handleOptionChange}
          value={options.maxYear}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
          {/* Add options for all the years from 1900 until now */}
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
          value={options.minYear}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
          {/* Add options for all the years from 1900 until now */}
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
          value={options.maxRating}
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
      <Form.Group className={`${classes['form_group']}`} controlId="select-min_rating">
        <Form.Label>
          Min Rating
        </Form.Label>
        <Form.Control
          size="lg"
          as="select"
          name="minRating"
          onChange={handleOptionChange}
          value={options.minRating}
        >
          <option key={'Any'} value={'Any'}>
            {'Any'}
          </option>
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
  )
}

export default DiscoverForm;
