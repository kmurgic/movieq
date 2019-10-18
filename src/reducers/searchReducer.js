const initialState = {
  error: false,
  firstLoad: true,
  isLoading: false,
  movies: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'QUERY_MOVIES_REQUEST':
      return { ...state, error: false, firstLoad: false, isLoading: true };
    case 'QUERY_MOVIES_SUCCESS':
      return { ...state, error: false, isLoading: false, movies: action.payload };
    case 'QUERY_MOVIES_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default searchReducer;
