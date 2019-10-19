import rootReducer from '../index';

jest.mock('../discoverReducer', () => () => 'discover');
jest.mock('../notificationsReducer', () => () => 'notifications');
jest.mock('../queuesReducer', () => () => 'queues');
jest.mock('../searchReducer', () => () => 'search');

it('should call each reducer and combine results into one state', () => {
  expect(rootReducer()).toEqual({
    discover: 'discover',
    notifications: 'notifications',
    queues: 'queues',
    search: 'search',
  });
});
