import React from 'react';
import classes from './index.module.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const movies = ['Movie 1 (2019)', 'Movie 2 (2017)', 'Movie 3 (2015)'];

const Queues = () => {
  return (
    <>
      <h1 className='mb-5'>My Queues</h1>
      <div className="d-flex mt-4 flex-wrap justify-content-between w-100">
        <div className={`${classes.queue} m-4 d-inline-block`}>
          <h2 className="text-center mb-3">Main Queue</h2>
          <ListGroup className="w-100">
            {movies.map((movie, index) => {
              const variant = index % 2 ? 'info' : 'light';
              return (
                <ListGroup.Item
                  action
                  className={`${classes['queue-item']} d-flex justify-content-between`
                    + ' align-items-center pl-sm-0 pt-sm-0 pb-sm-0'}
                  variant={variant}>
                  <Image
                    className={`${classes.thumbnail} mr-4`}
                    src="https://image.tmdb.org/t/p/w370_and_h556_bestv2/a4BfxRK8dBgbQqbRxPs8kmLd8LG.jpg"
                    thumbnail
                  />
                  <span className={classes['movie-title']}>{movie}</span>
                  <Button size='lg' variant="outline-danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  )
}

export default Queues;
