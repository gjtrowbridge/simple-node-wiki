var React = require('react');

var DisplayBox = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="display-box">
      Display Box
      </div>
    );
  }
});

module.exports = DisplayBox;