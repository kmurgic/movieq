import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import DiscoverForm from '../DiscoverForm';
import { discoverMoviesRequest } from '../../../actions';

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const mockSetPage = jest.fn();

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <DiscoverForm setPage={mockSetPage} />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

it('correctly updates state for each option', () => {
  wrapper.find(Form.Control).forEach((input, index) => {
    const initialFilters = {
      genre: 'Any',
      maxYear: 'Any',
      minYear: 'Any',
      maxRating: 'Any',
      minRating: 'Any',
    };
    const { name } = input.props();
    input.invoke('onChange')({ currentTarget: { name, value: 'new value' } });
    const newInput = wrapper.find(Form.Control).at(index);
    expect(newInput.props().value).toEqual('new value');
    const expectedFilters = { ...initialFilters, [name]: 'new value' };
    const expectedAction = discoverMoviesRequest(expectedFilters);
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    expect(mockSetPage).toHaveBeenCalledWith(1);
  });
});
