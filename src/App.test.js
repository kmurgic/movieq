import React from 'react';
import { mount } from 'enzyme';
import App from './App';

let wrapper;

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
}));

// avoid mounting the whole tree
jest.mock('react-router-dom', () => ({
  BrowserRouter: () => <div />,
  Switch: () => <div />,
  Route: () => <div />,
}));

jest.mock('./pages/Queues', () => () => <div />);

beforeEach(() => {
  wrapper = mount(<App />);
});

afterEach(() => {
  wrapper.unmount();
});

it('renders without crashing', () => {
  expect(wrapper);
});

it('dispatches discoverMoviesRequest', () => {
  expect(mockDispatch).toHaveBeenCalled();
});

jest.clearAllMocks();
