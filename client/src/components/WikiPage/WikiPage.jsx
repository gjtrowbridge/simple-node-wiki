var React = require('react');

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
    // get value
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    return (
      <div className="wiki-page">
        {this.state.pageName}
      </div>
    );
  }
});

module.exports = WikiPage;