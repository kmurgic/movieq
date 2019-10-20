import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

const SearchBar = props => {
  const { handleSearch } = props;
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <Form
      className="d-flex justify-content-center flex-nowrap mb-4"
      inline
      onSubmit={handleSubmit}
    >
      <InputGroup className="flex-nowrap">
        <FormControl
          type="text"
          placeholder="Search for Movies..."
          className={`${classes['search-input']} w-50 mr-0`}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <InputGroup.Append>
          <Button
            className={classes['search-button']}
            type="submit"
            variant="outline-secondary"
          >
            <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
