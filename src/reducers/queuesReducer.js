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

const removeQueue = (state, action) => {
  const { queueId } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
    return state;
  }
  const queueListCopy = [...state.queueList];
  queueListCopy.splice(queueIndex, 1);
  return { ...state, queueList: queueListCopy };
};

const reorderQueue = (state, action) => {
  const { startPos, endPos } = action.payload;
  const queueListCopy = [...state.queueList];
  const queueToMove = queueListCopy[startPos];
  // remove queue from start position
  queueListCopy.splice(startPos, 1);
  // then add it back at end position
  queueListCopy.splice(endPos, 0, queueToMove);
  return { ...state, queueList: queueListCopy };
};

const changeQueue = (state, action) => {
  const { queueId, changes } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
    return state;
  }
  // don't mutate state directly
  const queueListCopy = [...state.queueList];
  const queueToChange = queueListCopy[queueIndex];
  const newQueue = { ...queueToChange, ...changes };
  queueListCopy.splice(queueIndex, 1, newQueue);
  console.log(queueListCopy)
  return { ...state, queueList: queueListCopy };
};

const addItemToQueue = (state, action) => {
  const { queueId, movie } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
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

const removeQueueItem = (state, action) => {
  const { queueId, movieId } = action.payload;
  const queueIndex = state.queueList.findIndex(queue => queue.id === queueId);
  if (queueIndex === -1) {
    return state;
  }
  const oldQueue = { ...state.queueList[queueIndex] };
  // don't mutate state directly
  const moviesCopy = [...oldQueue.movies];
  const movieIndex = moviesCopy.findIndex(movie => movie.id === movieId);
  if (movieIndex === -1) {
    return state;
  };
  moviesCopy.splice(movieIndex, 1);
  const newQueue = { ...oldQueue, movies: moviesCopy };
  const queueListCopy = [...state.queueList];
  queueListCopy.splice(queueIndex, 1, newQueue);
  return { ...state, queueList: queueListCopy };
};

const queuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUEUE_ADD':
      return addQueue(state, action);
    case 'QUEUE_REMOVE':
      return removeQueue(state, action);
    case 'QUEUE_REORDER':
      return reorderQueue(state, action);
    case 'QUEUE_CHANGE':
      return changeQueue(state, action);
    case 'QUEUE_ITEM_ADD':
      return addItemToQueue(state, action);
    case 'QUEUE_ITEM_REORDER':
      return reorderQueueItem(state, action);
    case 'QUEUE_ITEM_REMOVE':
      return removeQueueItem(state, action);
    default:
      return state;
  }
};

export default queuesReducer;