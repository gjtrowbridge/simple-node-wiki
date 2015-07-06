var React = require('react');

var PageList = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="page-list">
        PageList, {this.props.type}
      </div>
    );
  }
});

module.exports = PageList;