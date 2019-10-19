import React from 'react';
import Notification from '../Notification';
import { useSelector } from 'react-redux';
import classes from './index.module.css';

const NotificationContainer = (props) => {
  const notifications = useSelector(state => state.notifications.notificationList);
  return (
    <div className={classes['notification_container']}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notificationId={notification.id}
          body={notification.body}
          heading={notification.heading}
          variant={notification.variant}
        />
      ))
      }
    </div>
  );
};

export default NotificationContainer;
