var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.jsx');
var EditBox = require('../EditBox/EditBox.jsx');

var WikiPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    var params = this.context.router.getCurrentParams();
    return {
      pageName: params.page_name
    };
  },
  componentDidMount: function() {
    // Query server for page data
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    return (
      <div className="wiki-page">
        <h3>{this.state.pageName}</h3>
        <EditBox />
        <DisplayBox />
      </div>
    );
  }
});

module.exports = WikiPage;