var React = require('react');

var EditBox = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="edit-box">
        Edit Box
      </div>
    );
  }
});

module.exports = EditBox;