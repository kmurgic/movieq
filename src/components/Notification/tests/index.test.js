import React from 'react';
import { shallow } from 'enzyme';
import Notification from '../index';
import Toast from 'react-bootstrap/Toast';
import { notificationRemove } from '../../../actions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => mockDispatch),
}));

const wrapper = shallow(
  <Notification
    notificationId={1}
    heading="Success!"
    body="Item added to queue"
    variant="success"
  />,
);

it('should render a toast', () => {
  expect(wrapper.find(Toast).length).toEqual(1);
});

it('should dispatch notification remove on close', () => {
  const toast = wrapper.find(Toast);
  toast.invoke('onClose')();
  expect(mockDispatch).toHaveBeenCalledWith(notificationRemove(1));
});
