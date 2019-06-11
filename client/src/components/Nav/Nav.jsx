
import React from 'react';
import { Link } from 'react-router-dom';
import AppStateActionCreators from '../../actions/AppStateActionCreators';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators';
import SearchBar from '../SearchBar/SearchBar.jsx';
import WikiPageUrlTitleForm from '../WikiPage/WikiPageUrlTitleForm.jsx';
import UserInfo from 'Components/UserInfo/UserInfo.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.showUserInfoModal = this.showUserInfoModal.bind(this);
  }
  showCreatePageModal() {
    const innerNode = (
      <WikiPageUrlTitleForm />
    );
    AppStateActionCreators.showModal(innerNode);
  }
  showUserInfoModal() {
    const { user } = this.props;
    const innerNode = (
      <UserInfo
        logoutFn={() => {
          WikiPageActionCreators.logoutUser();
          AppStateActionCreators.hideModal();
        }}
        userEmail={user.email}
      />
    );
    AppStateActionCreators.showModal(innerNode);
  }
  render() {
    const id = this.props.id !== undefined ?
        this.props.id : "";
    let userComponent = (
      <a className="google-login layout-fill-and-center" href="_auth/google/callback">
        <img src={"https://evernote.com/img/home/google-logo.svg"} />Sign up/in with Google
      </a>
    );
    let searchComponent;
    let newPageComponent;
    const user = this.props.user;
    if (user) {
      userComponent = (
        <button className="layout-fill-and-center"
                onClick={this.showUserInfoModal}
        >
          User Info ({user.email})
        </button>
      );

      searchComponent = (
        <div className="nav-item">
          <SearchBar />
        </div>
      );

      newPageComponent = (
        <div className="nav-item">
          <button className="layout-fill-and-center"
                  onClick={this.showCreatePageModal}>+ New Page</button>
        </div>
      );
    }
    return (
      <nav className="nav" id={id}>
        <div className="nav-item">
          <Link to={"/"} className="layout-fill-and-center">Home</Link>
        </div>
        {searchComponent}
        {newPageComponent}
        <div className="nav-item">
          {userComponent}
        </div>
      </nav>
    );
  }
}

export default Nav;
