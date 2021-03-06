import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import QueueItem from './QueueItem';
import classes from './index.module.css';


const Queue = props => {
  const {
    changeQueue, getRemoveFromQueueFunction, remove, reorder, movies, name,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [hasValidated, setHasValidated] = useState(false)

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
    setEditName(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    setHasValidated(true);
    if (form.checkValidity() === false) {
      return;
    }
    setHasValidated(false);
    setEditMode(false);
    changeQueue({ name: editName });
  }

  return (
    <div className={`${classes.queue} text-center bg-light px-5 pt-4 pb-3 m-sm-4 d-inline-block`}>
      {remove && (
        <Button
          className={`${classes['remove_queue']} shadow-lg`}
          onClick={remove}
          variant="danger"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      )}
      {editMode
        ? (
          <Form
            className={`${classes.form} d-inline-block ml-auto mr-auto mb-3`}
            noValidate
            onSubmit={handleSubmit}
            validated={hasValidated}
          >
            <InputGroup className="d-flex flex-row align-items-start flex-nowrap">
              <Form.Group controlId="queue-name_input pr-0">
                <Form.Control
                  className={`${classes['name_input']} w-75 d-inline`}
                  maxLength={25}
                  onChange={handleNameChange}
                  required
                  type="text"
                  value={editName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name for this queue.
              </Form.Control.Feedback>
              </Form.Group>
              <Button
                className={classes.save}
                type="submit"
                variant="outline-primary"
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </InputGroup>
          </Form>
        )
        : (
          <h2 className="text-center mb-4">
            {name}
            <Button
              className="ml-4"
              onClick={toggleEditMode}
              variant="outline-success"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </h2>
        )
      }
      {movies.length
        ? (
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
        )
        : (
          <>
            <p>You don't have any movies in this queue.</p>
            <p>
              <Link
                className="text-secondary"
                to={`${process.env.PUBLIC_URL}/discover`}
              >
                Discover new movies
                </Link>
            </p>
            <p>
              <Link
                className="text-secondary"
                to={`${process.env.PUBLIC_URL}/search`}
              >
                Search for movies
                </Link>
            </p>
          </>
        )
      }
    </div >
  )
}

Queue.propTypes = {
  changeQueue: PropTypes.func.isRequired,
  getRemoveFromQueueFunction: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  remove: PropTypes.func,
  reorder: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    posterSrc: PropTypes.string,
    title: PropTypes.string,
  })),
}

export default Queue;
