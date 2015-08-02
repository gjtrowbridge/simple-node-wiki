var React = require('react');
var Link = require('react-router').Link;

var Nav = React.createClass({
  render: function() {
    return (
      <nav className="nav">
        <Link to={"/"}>Home</Link>
      </nav>
    );
  }
});

module.exports = Nav;
