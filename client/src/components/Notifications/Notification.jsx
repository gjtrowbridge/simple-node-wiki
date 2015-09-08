var React = require('react');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var CloseButton = require('../CloseButton/CloseButton.jsx');

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
        <CloseButton onClick={this.remove} />
      </li>
    );
  }
});

module.exports = Notification;
