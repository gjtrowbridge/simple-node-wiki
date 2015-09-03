var React = require('react');
var Notification = require('./Notification.jsx');

var NotificationTopBar = React.createClass({
  PropTypes: {
    notifications: React.PropTypes.array.isRequired
  },
  render: function() {
    var notifications = this.props.notifications.map(function(n) {
      return (
        <Notification text={n.text}
            key={n.notificationId}
            notificationId={n.notificationId} />
      );
    });
    return (
      <ul className="notification-top-bar">
        {notifications}
      </ul>
    );
  }
});

module.exports = NotificationTopBar;