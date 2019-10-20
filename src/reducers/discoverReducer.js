const initialState = {
  error: false,
  firstLoad: true,
  isLoading: false,
  movies: [],
};

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISCOVER_MOVIES_REQUEST':
      return { ...state, error: false, firstLoad: false, isLoading: true };
    case 'DISCOVER_MOVIES_SUCCESS':
      return {
        ...state, error: false, isLoading: false, movies: action.payload,
      };
    case 'DISCOVER_MOVIES_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default discoverReducer;
