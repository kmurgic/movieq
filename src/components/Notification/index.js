import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-bootstrap/Toast';
import { notificationRemove } from '../../actions/';
import classes from './index.module.css';

const Notification = props => {
  const { notificationId, body, heading, variant } = props;
  const dispatch = useDispatch();

  const handleDismissNotification = () => {
    dispatch(notificationRemove(notificationId));
  };

  return (
    <Toast
      className={`bg-${variant} ${classes.notification}`}
      onClose={handleDismissNotification}
    >
      <Toast.Header className="text-dark">
        <strong className="mr-auto">{heading}</strong>
      </Toast.Header>
      <Toast.Body className="pl-3 pr-3 text-white">{body}</Toast.Body>
    </Toast>
  )
}

Notification.defaultProps = {
  heading: 'Movie Queue',
  variant: 'success',
}

Notification.propTypes = {
  notificationId: PropTypes.number.isRequired,
  heading: PropTypes.string,
  body: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'danger', 'secondary']),
}

export default Notification;
