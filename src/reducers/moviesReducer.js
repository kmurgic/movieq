const initialState = {
  error: false,
  loading: false,
  list: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state, error: false, loading: false, list: action.payload,
      };
    case 'FETCH_MOVIES_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default moviesReducer;
