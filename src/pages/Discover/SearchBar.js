import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css';

const SearchBar = props => {
  const { handleSearch } = props;

  return (
    <Form className="d-flex justify-content-center flex-nowrap mb-4" inline>
      <FormControl
        type="text"
        placeholder="Search for Movies..."
        className={`${classes['search-input']} w-50 mr-0`}
      />
      <Button
        className={classes['search-button']}
        variant="outline-secondary"
      >
        <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
      </Button>
    </Form>
  );
}

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
