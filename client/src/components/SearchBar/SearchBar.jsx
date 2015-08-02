var React = require('react');

var SearchBar = React.createClass({
  render: function() {
    return (
      <input type="search" placeholder="Enter Search Term" />
    );
  }
});

module.exports = SearchBar;
