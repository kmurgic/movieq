import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css'
import PropTypes from 'prop-types';

const QueueItem = props => {
  const { id, index, posterSrc, removeFromQueue, title } = props;

  const [showRemove, setShowRemove] = useState(false);
  const handleRemoveClick = () => {
    removeFromQueue();
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <ListGroup.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          as="div"
          action
          className={`${classes['queue-item']} mx-1 mb-3 p-0 bg-transparent`}
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
        >
          <div className={classes['image_overlay']}>
            <Image
              className={`${classes.image} m-0 w-100`}
              src={posterSrc}
            />
          </div>
          <h5
            className={`${classes['movie-title']} mb-0 p-3 text-center text-black`}>
            {title}
          </h5>
          {showRemove &&
            (<Button
              className={`${classes['remove_item']} shadow-lg`}
              onClick={handleRemoveClick}
              size='lg'
              variant="danger"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            )
          }
        </ListGroup.Item>
      )}
    </Draggable>
  )
}

QueueItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  posterSrc: PropTypes.string.isRequired,
  removeFromQueue: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default QueueItem;