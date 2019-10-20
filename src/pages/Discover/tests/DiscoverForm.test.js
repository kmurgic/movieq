import React from 'react';
import { shallow } from 'enzyme';
import Form from 'react-bootstrap/Form';
import DiscoverForm from '../DiscoverForm';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
];

const mockState = {
  discover: {
    error: false,
    firstLoad: false,
    isLoading: false,
    movies: mockMovieList,
  },
};

jest.mock('react-redux', () => ({
  useDispatch: fn => fn(mockState),
}));

let wrapper;

beforeEach(() => {
  wrapper = shallow(<DiscoverForm />)
});

afterEach(() => {
  jest.clearAllMocks();
});

it('correctly updates state for each option', () => {
  wrapper.find(Form.Control).forEach((input, index) => {
    const { name } = input.props();
    input.invoke('onChange')({ currentTarget: { name, value: 'new value' } });
    const newInput = wrapper.find(Form.Control).at(index);
    expect(newInput.props().value).toEqual('new value');
  });
});
