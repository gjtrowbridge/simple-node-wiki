var React = require('react');
var Link = require('react-router').Link;
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var SearchBar = require('../SearchBar/SearchBar.jsx');

var Nav = React.createClass({
  showNewPageModal: function() {
    AppStateActionCreators.showModal('new page!');
  },
  render: function() {
    return (
      <nav className="nav">
        <Link to={"/"}>Home</Link>
        <SearchBar />
        <button onClick={this.showNewPageModal}>+ New Page</button>
      </nav>
    );
  }
});

module.exports = Nav;
