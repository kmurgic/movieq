import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './index.module.css'
import { queueItemReorder } from '../../actions';

const Queues = () => {
  const dispatch = useDispatch();
  const queueList = useSelector(state => state.queues.queueList, shallowEqual);
  const movies = queueList[0].movies;

  const onDragEnd = (result) => {
    // dropped outside list
    if (!result.destination) {
      return;
    }

    dispatch(queueItemReorder(
      queueList[0].id,
      result.source.index,
      result.destination.index
    ));
  };

  return (
    <>
      <h1 className='mb-5'>My Queues</h1>
      <div className="d-flex mt-4 flex-wrap justify-content-between w-100">
        <div className={`${classes.queue} m-sm-4 d-inline-block`}>
          <h2 className="text-center mb-3">Main Queue</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <ListGroup
                  className="w-100"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {movies.map((movie, index) => {
                    const { id, posterSrc, title } = movie;
                    const variant = index % 2 ? 'info' : 'light';
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided, snapshot) => (
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
                    );
                  })}
                  {provided.placeholder}
                </ListGroup>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  )
}

export default Queues;
