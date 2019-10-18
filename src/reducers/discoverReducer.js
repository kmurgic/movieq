const initialState = {
  error: false,
  loading: false,
  movies: [],
};

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, error: false, loading: true };
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state, error: false, loading: false, movies: action.payload,
      };
    case 'FETCH_MOVIES_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default discoverReducer;
