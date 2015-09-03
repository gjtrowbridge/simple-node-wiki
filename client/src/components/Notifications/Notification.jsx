var React = require('react');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');

var Notification = React.createClass({
  PropTypes: {
    text: React.PropTypes.string.isRequired,
    notificationId: React.PropTypes.number.isRequired
  },
  remove: function() {
    AppStateActionCreators.hideNotification(this.props.notificationId);
  },
  render: function() {
    return (
      <li className="notification">
        {this.props.text}
        {this.props.notificationId}
        <span onClick={this.remove}>X</span>
      </li>
    );
  }
});

module.exports = Notification;