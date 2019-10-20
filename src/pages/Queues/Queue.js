import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import QueueItem from './QueueItem';
import classes from './index.module.css';


const Queue = props => {
  const {
    changeQueue, getRemoveFromQueueFunction, reorder, movies, name,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);

  const toggleEditMode = () => {
    setEditMode(previousEditMode => !previousEditMode);
  }

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

  const handleNameChange = (e) => {
    setEditName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    changeQueue({ name: editName });
  }

  return (
    <div className={`${classes.queue} text-center bg-light px-5 pt-4 pb-3 m-sm-4 d-inline-block`}>
      {editMode
        ? (
          <Form
            className={`${classes.form} d-inline-block ml-auto mr-auto mb-3`}
            onSubmit={handleSubmit}>
            <FormControl
              className={`${classes['name_input']} w-75 d-inline`}
              onChange={handleNameChange}
              value={editName}
            />
            <Button
              className="ml-4"
              type="submit"
              variant="outline-primary"
            >
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Form>
        )
        : (
          <h2 className="text-center mb-4">
            {name}
            <Button
              className="ml-4"
              onClick={toggleEditMode}
              variant="outline-primary"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </h2>
        )
      }
      < DragDropContext onDragEnd={onDragEnd}>
        <Droppable direction="horizontal" droppableId="droppable">
          {(provided) => (
            <ListGroup
              className="d-flex-inline flex-row justify-content-start flex-nowrap overflow-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {movies.map((movie, index) => {
                const { id, posterSrc, title } = movie;
                return (
                  <QueueItem
                    key={id}
                    id={id}
                    index={index}
                    posterSrc={posterSrc}
                    removeFromQueue={getRemoveFromQueueFunction(id)}
                    title={title}
                  />
                );
              })}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </div >
  )
}

Queue.propTypes = {
  changeQueue: PropTypes.func.isRequired,
  getRemoveFromQueueFunction: PropTypes.func.isRequired,
  name: PropTypes.string,
  reorder: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    posterSrc: PropTypes.string,
    title: PropTypes.string,
  })),
}

export default Queue;
