var React = require('react');
import Notification from './Notification.jsx';
import PropTypes from 'prop-types';

class NotificationTopBar extends React.Component {
  render() {
    var notifications = this.props.notifications.map(function(n) {
      return (
        <Notification text={n.text}
            key={n.notificationId}
            notificationId={n.notificationId} />
      );
    });
    return (
      <div className="notification-top-bar">
        <ul className="notification-list">
          {notifications}
        </ul>
      </div>
    );
  }
}

NotificationTopBar.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationTopBar;
