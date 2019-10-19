import queuesReducer from '../queuesReducer';

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
  const action = {
    type: 'QUEUE_ADD',
    payload: {
      name: 'My Second Queue',
    },
  };

  const expectedNewQueue = {
    id: 2,
    name: 'My Second Queue',
    movies: [],
  };

  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList[1]).toEqual(expectedNewQueue);
});

it('should remove a queue', () => {
  const action = {
    type: 'QUEUE_REMOVE',
    payload: {
      queueId: 1,
    },
  };

  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList.length).toEqual(0);
});

it('should add an item to a queue', () => {
  const action = {
    type: 'QUEUE_ITEM_ADD',
    payload: {
      queueId: 1,
      movie: mockMovie,
    },
  };
  const stateAfterAction = queuesReducer(initialState, action);
  expect(stateAfterAction.queueList[0].movies[0]).toEqual(mockMovie);
});

it('should leave state unchanged on item add action called with invalid queue id', () => {
  const action = {
    type: 'QUEUE_ITEM_ADD',
    payload: {
      queueId: 2,
      movie: mockMovie,
    },
  };
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
  const action = {
    type: 'QUEUE_ITEM_REORDER',
    payload: {
      queueId: 1,
      startPos: 3,
      endPos: 1,
    },
  };

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
  const action = {
    type: 'QUEUE_ITEM_REORDER',
    payload: {
      queueId: 1,
      startPos: 2,
      endPos: 4,
    },
  };

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
  const action = {
    type: 'QUEUE_ITEM_REORDER',
    payload: {
      queueId: 2,
      startPos: 2,
      endPos: 4,
    },
  };

  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction).toEqual(stateWithMovies);
});

it('should remove a queue item', () => {
  const action = {
    type: 'QUEUE_ITEM_REMOVE',
    payload: {
      queueId: 1,
      movieId: 'm2',
    },
  };

  const expectedNewMovies = [
    { id: 'm1' },
    { id: 'm3' },
    { id: 'm4' },
    { id: 'm5' },
  ];

  const stateAfterAction = queuesReducer(stateWithMovies, action);
  expect(stateAfterAction.queueList[0].movies).toEqual(expectedNewMovies);
});

it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'QUE_ADD' };
  expect(queuesReducer(undefined, action)).toEqual(initialState);
});
