import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classes from './index.module.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Queues = () => {

  const queueList = useSelector(state => state.queues.queueList, shallowEqual);
  const movies = queueList[0].movies;

  return (
    <>
      <h1 className='mb-5'>My Queues</h1>
      <div className="d-flex mt-4 flex-wrap justify-content-between w-100">
        <div className={`${classes.queue} m-sm-4 d-inline-block`}>
          <h2 className="text-center mb-3">Main Queue</h2>
          <ListGroup className="w-100">
            {movies.map((movie, index) => {
              const { id, posterSrc, title } = movie;
              const variant = index % 2 ? 'info' : 'light';
              return (
                <ListGroup.Item
                  key={id}
                  as="div"
                  action
                  className={`${classes['queue-item']} d-flex justify-content-between`
                    + ' align-items-center pl-sm-0 pt-sm-0 pb-sm-0'}
                  variant={variant}>
                  <Image
                    className={`${classes.thumbnail} mr-4`}
                    src={posterSrc}
                    thumbnail
                  />
                  <span className={classes['movie-title']}>{title}</span>
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
