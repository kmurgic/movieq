const initialState = {
  nextId: 1,
  notificationList: [
  ],
};

const addNotification = (state, action) => {
  const { heading, body, variant } = action.payload;
  const newNotification = {
    id: state.nextId,
    heading,
    body,
    variant,
  };
  const newNotificationList = [...state.notificationList, newNotification];
  return { ...state, notificationList: newNotificationList, nextId: state.nextId + 1 };
};

const removeNotification = (state, action) => {
  const { notificationId } = action.payload;
  const notificationIndex = state.notificationList.findIndex(notification => notification.id === notificationId);
  if (notificationIndex === -1) {
    return state;
  }
  const notificationListCopy = [...state.notificationList];
  notificationListCopy.splice(notificationIndex, 1);
  return { ...state, notificationList: notificationListCopy };
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_ADD':
      return addNotification(state, action);
    case 'NOTIFICATION_REMOVE':
      return removeNotification(state, action);
    default:
      return state;
  }
};

export default notificationsReducer;