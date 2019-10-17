import rootReducer from '../index';

jest.mock('../moviesReducer', () => () => 'movies');

it('should call each reducer and combine results into one state', () => {
  expect(rootReducer()).toEqual({ movies: 'movies' });
});
