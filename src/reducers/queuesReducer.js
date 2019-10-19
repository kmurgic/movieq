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

const addQueue = (state, action) => {
  const { name } = action.payload;
  const newQueue = {
    id: state.nextId,
    name,
    movies: [],
  };
  const newQueueList = [...state.queueList, newQueue];
  return { ...state, queueList: newQueueList, nextId: state.nextId + 1 };
};

const addItemToQueue = (state, action) => {
  const { queueId, movie } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
    // TO-DO: Log error and notify user of error
    return state;
  }
  const oldQueue = { ...state.queueList[queueIndex] };
  const newMovies = [...oldQueue.movies, movie];
  const newQueue = { ...oldQueue, movies: newMovies };
  // don't mutate state.queueList directly
  const queueListCopy = [...state.queueList];
  queueListCopy.splice(queueIndex, 1, newQueue);
  return { ...state, queueList: queueListCopy };
};

const reorderQueueItem = (state, action) => {
  const { queueId, startPos, endPos } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
    // TO-DO: Log error and notify user of error
    return state;
  }
  const oldQueue = { ...state.queueList[queueIndex] };
  // don't mutate state directly
  const moviesCopy = [...oldQueue.movies];
  const movieToMove = moviesCopy[startPos];
  // remove movie from queue
  moviesCopy.splice(startPos, 1);
  // add movie back to queue at end position
  moviesCopy.splice(endPos, 0, movieToMove);
  const newQueue = { ...oldQueue, movies: moviesCopy };
  const queueListCopy = [...state.queueList];
  queueListCopy.splice(queueIndex, 1, newQueue);
  return { ...state, queueList: queueListCopy };
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUEUE_ADD':
      return addQueue(state, action);
    case 'QUEUE_ITEM_ADD':
      return addItemToQueue(state, action);
    case 'QUEUE_ITEM_REORDER':
      return reorderQueueItem(state, action);
    default:
      return state;
  }
};

export default searchReducer;