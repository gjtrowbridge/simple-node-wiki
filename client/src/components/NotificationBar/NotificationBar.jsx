var React = require('react');

var NotificationBar = React.createClass({
  PropTypes: {
    text: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div class="notification-bar">
        {this.props.text}
      </div>
    );
  }
});

module.exports = NotificationBar;
