var React = require('react');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="home-page">
        Home page!
      </div>
    );
  }
});

module.exports = HomePage;
