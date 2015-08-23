var React = require('react');
var PageStoreActionCreators = require('../../actions/PageStoreActionCreators.js');

var NotificationBar = React.createClass({
  PropTypes: {
    text: React.PropTypes.string.isRequired,
    notificationId: React.PropTypes.number.isRequired
  },
  remove: function() {
    PageStoreActionCreators.hideNotification(this.props.notificationId);
  },
  render: function() {
    return (
      <li className="notification-bar">
        {this.props.text}
        {this.props.notificationId}
        <span onClick={this.remove}>X</span>
      </li>
    );
  }
});

module.exports = NotificationBar;
