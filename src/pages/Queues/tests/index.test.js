import React from 'react';
import { shallow } from 'enzyme';
import Queues from '../index';
import Queue from '../Queue';
import { queueItemReorder, queueItemRemove, queueChange, queueAdd, queueRemove } from '../../../actions';
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

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Queues />)
});

afterEach(() => {
  jest.clearAllMocks();
});

it('calls the proper dispatch action when list is reorderd', () => {
  const queue = wrapper.find(Queue);
  queue.invoke('reorder')(2, 3);
  const expectedAction = queueItemReorder(1, 2, 3);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a queue item is removed', () => {
  const queue = wrapper.find(Queue);
  queue.invoke('getRemoveFromQueueFunction')(3)(1);
  const expectedAction = queueItemRemove(1, 3);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a queue changes names', () => {
  const queue = wrapper.find(Queue);
  queue.invoke('changeQueue')({ name: 'new name' });
  const expectedAction = queueChange(1, { name: 'new name' });
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('calls the proper dispatch action when a new queue is added', () => {
  const addButton = wrapper.find(Button);
  addButton.invoke('onClick')();
  const expectedAction = queueAdd('New Watchlist');
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
});

it('does not pass a remove function when there is only one queue', () => {
  const queue = wrapper.find(Queue);
  expect(queue.props().remove).toEqual(null);
});

it('dispatches the correct remove action when a queue is removed', () => {
  const originalQueueList = [...mockState.queues.queueList];
  mockState.queues.queueList.push({ id: 2, movies: [] });
  // create new wrapper with new state
  wrapper = shallow(<Queues />);
  const queue = wrapper.find(Queue).at(1);
  queue.invoke('remove')();
  const expectedAction = queueRemove(2);
  expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  // reset for future tests
  mockState.queues.queueList = originalQueueList;
});

jest.clearAllMocks();
