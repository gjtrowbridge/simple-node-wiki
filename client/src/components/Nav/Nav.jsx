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
    var id = this.props.id !== undefined ?
        this.props.id : "";
    return (
      <nav className="nav" id={id}>
        <div className="nav-item">
          <Link to={"/"} className="layout-fill-and-center">Home</Link>
        </div>
        <div className="nav-item">
          <SearchBar />
        </div>
        <div className="nav-item">
          <button className="btn btn-unobtrusive layout-fill-and-center"
              onClick={this.showCreatePageModal}>+ New Page</button>
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
