import React from 'react';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import classes from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Discover = () => {
  return (
    <>
      <Form className="d-flex justify-content-center" inline>
        <FormControl
          type="text"
          placeholder="Search for Movies to Add to Your Queue"
          className={`${classes['search-input']} w-75 mr-0`}
        />
        <Button
          className={classes['search-button']}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
    </>
  );
};

export default Discover;
