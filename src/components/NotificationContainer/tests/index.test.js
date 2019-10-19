import React from 'react';
import { shallow } from 'enzyme';
import NotificationContainer from '../index';
import Notification from '../../Notification';

const mockNotificationList = [{
  id: 1,
  body: 'notification'
}, {
  id: 2,
  body: 'notification'
}, {
  id: 3,
  body: 'notification'
}, {
  id: 4,
  body: 'notification'
}, {
  id: 5,
  body: 'notification'
}];

const mockState = {
  notifications: {
    nextId: 6,
    notificationList: mockNotificationList,
  }
}

jest.mock('react-redux', () => ({
  useSelector: fn => fn(mockState),
}));

let wrapper;

beforeEach(() => {
  wrapper = shallow(<NotificationContainer />);
});

it('renders a notificationfor each notifications in the list', () => {
  expect(wrapper.find(Notification).length).toEqual(5);
});
