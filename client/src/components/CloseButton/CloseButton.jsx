var React = require('react');

var CloseButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <button className="close-button" onClick={this.props.onClick}>
        x
      </button>
    );
  }
});

module.exports = CloseButton;
