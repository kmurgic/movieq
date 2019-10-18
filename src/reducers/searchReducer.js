const initialState = {
  error: false,
  loading: false,
  movies: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUERY_MOVIES_REQUEST':
      return { ...state, error: false, loading: true };
    case 'QUERY_MOVIES_SUCCESS':
      return {
        ...state, error: false, loading: false, movies: action.payload,
      };
    case 'QUERY_MOVIES_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default searchReducer;
