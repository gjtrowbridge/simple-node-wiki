var React = require('react');
const { Link } = require('react-router-dom');
var AppStateActionCreators = require('../../actions/AppStateActionCreators');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var WikiPageUrlTitleForm = require('../WikiPage/WikiPageUrlTitleForm.jsx');

var Nav = React.createClass({
  showCreatePageModal: function() {
    var innerNode = (
      <WikiPageUrlTitleForm />
    );
    AppStateActionCreators.showModal(innerNode);
  },
  logout: function() {
    WikiPageActionCreators.logoutUser();
  },
  render: function() {
    var id = this.props.id !== undefined ?
        this.props.id : "";
    var userComponent;
    var user = this.props.user;
    if (user) {
      userComponent = (
        <button className="btn btn-unobtrusive layout-fill-and-center"
                onClick={this.logout}
        >
          Logout
        </button>
      );
    } else {
      userComponent = (
        <a className="google-login layout-fill-and-center" href="_auth/google/callback">
          <img src={"https://evernote.com/img/home/google-logo.svg"} />Sign up/in with Google
        </a>
      );
    }
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
        <div className="nav-item">
          {userComponent}
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
