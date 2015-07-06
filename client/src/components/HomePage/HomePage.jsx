var React = require('react');
var PageList = require('../PageList/PageList.jsx');


var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="home-page">
        Home page!
        <PageList type="modified" limit="10" />
        <PageList type="visited" limit="10" />
        <PageList type="favorites" />
      </div>
    );
  }
});

module.exports = HomePage;
