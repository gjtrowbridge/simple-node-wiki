var React = require('react');
var Link = require('react-router').Link;
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var WikiPageUrlTitleForm = require('../WikiPage/WikiPageUrlTitleForm.jsx');

var Nav = React.createClass({
  showCreatePageModal: function() {
    var innerNode = (
      <WikiPageUrlTitleForm />
    );
    AppStateActionCreators.showModal(innerNode);
  },
  render: function() {
    return (
      <nav className="nav">
        <Link to={"/"}>Home</Link>
        <SearchBar />
        <button onClick={this.showCreatePageModal}>+ New Page</button>
      </nav>
    );
  }
});

module.exports = Nav;
