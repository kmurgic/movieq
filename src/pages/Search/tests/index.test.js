import React from 'react';
import { shallow } from 'enzyme';
import Search from '../index';
import SearchBar from '../SearchBar';
import { searchMoviesRequest } from '../../../actions';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
];

const mockState = {
  search: {
    firstLoad: false,
    isLoading: false,
    error: false,
    movies: mockMovieList,
  }
}
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: fn => fn(mockState),
  useDispatch: () => mockDispatch,
}));

it('renders without crashing', () => {
  shallow(<Search />);
});

it('dispatches the correct action on search', () => {
  const wrapper = shallow(<Search />);
  const searchBar = wrapper.find(SearchBar);
  searchBar.invoke('handleSearch')('foo');
  const action = searchMoviesRequest('foo');
  expect(mockDispatch).toHaveBeenCalledWith(action);
});
