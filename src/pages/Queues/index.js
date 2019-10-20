import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { queueItemReorder, queueItemRemove, queueChange } from '../../actions';
import Queue from './Queue';

const Queues = () => {
  const dispatch = useDispatch();
  const queueList = useSelector(state => state.queues.queueList, shallowEqual);

  const getReorderFunction = (queueId) => (start, end) => {
    dispatch(queueItemReorder(
      queueId,
      start,
      end,
    ));
  }

  const getRemoveFromQueueFunction = (queueId) => (movieId) => () => {
    dispatch(queueItemRemove(queueId, movieId));
  }

  const getChangeQueueFunction = (queueId) => (changes) => {
    dispatch(queueChange(queueId, changes));
  }

  return (
    <>
      <h1 className='mb-5'>My Queues</h1>
      <div className="d-flex mt-4 flex-wrap justify-content-around w-100">
        {queueList.map(queue => (
          <Queue
            key={queue.id}
            changeQueue={getChangeQueueFunction(queue.id)}
            movies={queue.movies}
            name={queue.name}
            reorder={getReorderFunction(queue.id)}
            getRemoveFromQueueFunction={getRemoveFromQueueFunction(queue.id)}
          />
        ))}
      </div>
    </>
  )
}

export default Queues;
