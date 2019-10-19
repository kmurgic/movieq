import rootReducer from '../index';

jest.mock('../discoverReducer', () => () => 'discover');
jest.mock('../queuesReducer', () => () => 'queues');
jest.mock('../searchReducer', () => () => 'search');

it('should call each reducer and combine results into one state', () => {
  expect(rootReducer()).toEqual({
    discover: 'discover', queues: 'queues', search: 'search',
  });
});
