import notificationsReducer from '../notificationsReducer';

const initialState = {
  nextId: 1,
  notificationList: [
  ],
};

it('should add a notification to the notification list', () => {
  const action = {
    type: 'NOTIFICATION_ADD',
    payload: {
      heading: 'Success',
      body: 'My First Notification',
      variant: 'success',
    },
  };

  const expectedNewNotification = {
    id: 1,
    heading: 'Success',
    body: 'My First Notification',
    variant: 'success',
  };

  const stateAfterAction = notificationsReducer(initialState, action);
  expect(stateAfterAction.notificationList[0]).toEqual(expectedNewNotification);
});

const stateWithNotifications = {
  nextId: 3,
  notificationList: [{
    id: 1,
    heading: 'Success',
    body: 'My First Notification',
    variant: 'success',
  }, {
    id: 2,
    heading: 'Failure',
    body: 'My Second Notification',
    variant: 'failure',
  }],
};

it('should remove a notification', () => {
  const action = {
    type: 'NOTIFICATION_REMOVE',
    payload: {
      notificationId: 1,
    },
  };

  const stateAfterAction = notificationsReducer(stateWithNotifications, action);
  expect(stateAfterAction.notificationList.length).toEqual(1);
});

it('should leave state unchanged on remove action called with invalid notification id', () => {
  const action = {
    type: 'NOTIFICATION_REMOVE',
    payload: {
      notificationId: 99,
    },
  };

  const stateAfterAction = notificationsReducer(stateWithNotifications, action);
  expect(stateAfterAction).toEqual(stateWithNotifications);
});


it('should leave state unchanged on mispelled action', () => {
  const action = { type: 'NOTFICATION_ADD' };
  expect(notificationsReducer(undefined, action)).toEqual(initialState);
});
