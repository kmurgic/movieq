import React from 'react';
import { shallow } from 'enzyme';
import Queues from '../index';
import Queue from '../Queue';
import { queueItemReorder, queueItemRemove, queueChange, queueAdd } from '../../../actions';
import Button from 'react-bootstrap/Button';

const mockMovieList = [
  { id: 'm1' },
  { id: 'm2' },
  { id: 'm3' },
];

const mockState = {
  queues: {
    queueList: [{
      id: 1,
      movies: mockMovieList,
    }],
  }
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: fn => fn(mockState),
  connect: () => { },
}));

jest.mock('../Queue', () => (props) => <div {...props} />);

afterEach(() => {
  jest.clearAllMocks();
});

it('calls the proper dispatch action when list is reorderd', () => {
  const wrapper = shallow(<Queues />);
  const queue = wrapper.find(Queue);
  queue.invoke('reorder')(2, 3);
  const expectedAction = queueItemReorder(1, 2, 3);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a queue item is removed', () => {
  const wrapper = shallow(<Queues />);
  const queue = wrapper.find(Queue);
  queue.invoke('getRemoveFromQueueFunction')(3)(1);
  const expectedAction = queueItemRemove(1, 3);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a queue changes names', () => {
  const wrapper = shallow(<Queues />);
  const queue = wrapper.find(Queue);
  queue.invoke('changeQueue')({ name: 'new name' });
  const expectedAction = queueChange(1, { name: 'new name' });
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a new queue is added', () => {
  const wrapper = shallow(<Queues />);
  const addButton = wrapper.find(Button);
  addButton.invoke('onClick')();
  const expectedAction = queueAdd('New Watchlist');
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

jest.clearAllMocks();
