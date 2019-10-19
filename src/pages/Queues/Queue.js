import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListGroup from 'react-bootstrap/ListGroup';
import classes from './index.module.css'
import PropTypes from 'prop-types';
import QueueItem from './QueueItem';

const Queue = props => {
  const { reorder, movies, name } = props;

  const onDragEnd = (result) => {
    // dropped outside list
    if (!result.destination) {
      return;
    }
    reorder(
      result.source.index, //start position
      result.destination.index, //end position
    );
  };

  return (
    <div className={`${classes.queue} m-sm-4 d-inline-block`}>
      <h2 className="text-center mb-3">{name}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ListGroup
              className="w-100"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {movies.map((movie, index) => {
                const { id, posterSrc, title } = movie;
                const variant = index % 2 ? 'info' : 'light';
                return (
                  <QueueItem
                    key={id}
                    id={id}
                    index={index}
                    posterSrc={posterSrc}
                    title={title}
                    variant={variant}
                  />
                );
              })}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

Queue.propTypes = {
  name: PropTypes.string,
  reorder: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    posterSrc: PropTypes.string,
    title: PropTypes.string,
  })),
}

export default Queue;
