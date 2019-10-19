import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css'
import PropTypes from 'prop-types';

const QueueItem = props => {
  const { id, index, posterSrc, title, variant } = props;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <ListGroup.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
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
      )}
    </Draggable>
  )
}

QueueItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  posterSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['info', 'light']).isRequired,
}

export default QueueItem;