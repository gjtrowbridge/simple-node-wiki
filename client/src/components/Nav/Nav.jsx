var React = require('react');
var Link = require('react-router').Link;
var SearchBar = require('../SearchBar/SearchBar.jsx');

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="nav">
        <Link to={"/"}>Home</Link>
        <SearchBar />
      </nav>
    );
  }
});

module.exports = Nav;
