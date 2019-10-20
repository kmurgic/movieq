import queuesReducer from '../queuesReducer';
import { queueAdd, queueRemove, queueChange, queueReorder, queueItemAdd, queueItemRemove, queueItemReorder } from '../../actions';

const initialState = {
  nextId: 2,
  queueList: [
    {
      id: 1,
      name: 'My Queue',
      movies: [],
    },
  ],
};

const mockMovie = { id: 'm1' };

it('should add a queue to the queue list', () => {
  const action = queueAdd('My Second Queue');
  const expectedNewQueue = {
    id: 2,
    name: 'My Second Queue',
    movies: [],
  };
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList[1]).toEqual(expectedNewQueue);
});

it('should remove a queue', () => {
  const action = queueRemove(1);
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList.length).toEqual(0);
});
it('should reorder a queue', () => {
  const action = queueChange(1, { name: 'New name' });
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList[0].name).toEqual('New name');
});

it('should not change state on queue change action with invalid queueId', () => {
  const action = queueChange(3, { name: 'New name' });
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction).toEqual(initialState);

});

it('should rename a queue', () => {
  const stateWithMultipleQueues = {
    nextId: 2,
    queueList: [
      {
        id: 1,
        name: 'My Queue',
        movies: [],
      },
      {
        id: 2,
        name: 'My Queue',
        movies: [],
      },
      {
        id: 3,
        name: 'My Queue',
        movies: [],
      },
    ],
  };
  const action = queueReorder(1, 2);
  const stateAfterAction = queuesReducer(stateWithMultipleQueues, action);
  expect(stateAfterAction.queueList[2].id).toEqual(2);
  expect(stateAfterAction.queueList[1].id).toEqual(3);

});

it('should leave state unchanged on remove action called with invalid queue id', () => {
  const action = queueRemove(2);
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction).toEqual(stateWithMovies);
});

it('should add an item to a queue', () => {
  const action = queueItemAdd(1, mockMovie);
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList[0].movies[0]).toEqual(mockMovie);
});

it('should leave state unchanged on item add action called with invalid queue id', () => {
  const action = queueItemAdd(2, mockMovie);
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction).toEqual(initialState);
});

const stateWithMovies = {
  nextId: 2,
  queueList: [{
    id: 1,
    movies: [
      { id: 'm1' },
      { id: 'm2' },
      { id: 'm3' },
      { id: 'm4' },
      { id: 'm5' },
    ],
    name: 'My Queue',
  }]
};

it('should reorder a queue item to earlier in the queue', () => {
  const action = queueItemReorder(1, 3, 1);
  const expectedNewMovies = [
    { id: 'm1' },
    { id: 'm4' },
    { id: 'm2' },
    { id: 'm3' },
    { id: 'm5' },
  ];
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction.queueList[0].movies).toEqual(expectedNewMovies);
});

it('should reorder a queue item to later in the queue', () => {
  const action = queueItemReorder(1, 2, 4);
  const expectedNewMovies = [
    { id: 'm1' },
    { id: 'm2' },
    { id: 'm4' },
    { id: 'm5' },
    { id: 'm3' },
  ];
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction.queueList[0].movies).toEqual(expectedNewMovies);
});

it('should leave state unchanged on reorder action called with invalid queue id', () => {
  const action = queueItemReorder(2, 2, 4);
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction).toEqual(stateWithMovies);
});

it('should remove a queue item', () => {
  const action = queueItemRemove(1, 'm2');
  const expectedNewMovies = [
    { id: 'm1' },
    { id: 'm3' },
    { id: 'm4' },
    { id: 'm5' },
  ];
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction.queueList[0].movies).toEqual(expectedNewMovies);
});

it('should leave state unchanged on remove action called with invalid queue id', () => {
  const action = queueItemRemove(2, 'm2');
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction).toEqual(stateWithMovies);
});

it('should leave state unchanged on remove action called with invalid movie id', () => {
  const action = queueItemRemove(1, 'm6');
  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction).toEqual(stateWithMovies);
});

it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'QUE_ADD' };
  expect(queuesReducer(undefined, action)).toEqual(initialState);
});
