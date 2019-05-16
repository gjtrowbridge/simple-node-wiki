var React = require('react');
const { Link } = require('react-router-dom');
import AppStateActionCreators from '../../actions/AppStateActionCreators';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators';
import SearchBar from '../SearchBar/SearchBar.jsx';
import WikiPageUrlTitleForm from '../WikiPage/WikiPageUrlTitleForm.jsx';

class Nav extends React.Component {
  showCreatePageModal() {
    var innerNode = (
      <WikiPageUrlTitleForm />
    );
    AppStateActionCreators.showModal(innerNode);
  }
  logout() {
    WikiPageActionCreators.logoutUser();
  }
  render() {
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
}

export default Nav;
