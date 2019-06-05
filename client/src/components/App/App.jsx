var React = require('react');
import AppStateStore from '../../stores/AppStateStore.js';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators.js';
import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import { setHistory } from 'Src/utils/HistoryContainer.js';

import WikiPage from 'Components/WikiPage/WikiPage.jsx';
import HomePage from 'Components/HomePage/HomePage.jsx';
import NotificationTopBar from '../Notifications/NotificationTopBar.jsx';
import Nav from '../Nav/Nav.jsx';
import Modal from '../Modal/Modal.jsx';
import Footer from '../Footer/Footer.jsx';
import AreaDisabler from '../AreaDisabler/AreaDisabler.jsx';

require('Components/App/App.scss');

class WikiPageWrapper extends React.Component {
  render() {
    return (
      <WikiPage pageName={this.props.match.params.pageName}/>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.renderNotificationTopBar = this.renderNotificationTopBar.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.modalIsOpen = this.modalIsOpen.bind(this);
    this.state = this.getStateFromStores();
  }
  getStateFromStores() {
    return {
      notifications: AppStateStore.activeNotifications(),
      modalInnerNode: AppStateStore.activeModalInnerNode(),
    };
  }
  _onChange() {
    this.setState(this.getStateFromStores());
  }
  componentDidMount() {
    setHistory(this.props.history);
    AppStateStore.addChangeListener(this._onChange);
    setTimeout(function() {
      WikiPageActionCreators.checkUser();
    }, 0);
  }
  componentWillUnmount() {
    AppStateStore.removeChangeListener(this._onChange);
  }
  renderNotificationTopBar() {
    if (this.state.notifications.length > 0) {
      return (
        <NotificationTopBar notifications={this.state.notifications} />
      );
    } else {
      return "";
    }
  }
  renderModal() {
    if (this.state.modalInnerNode) {
      return <Modal innerNode={this.state.modalInnerNode} />;
    } else {
      return "";
    }
  }
  modalIsOpen() {
    return !!this.state.modalInnerNode;
  }
  render() {
    return (
      <div className="app">
        <AreaDisabler shouldDisableClicks={this.modalIsOpen()} />
        {this.renderModal()}
        <div id="non-modal-container" className={this.modalIsOpen() ? "open-modal" : "no-modal"}>
          {this.renderNotificationTopBar()}
          <Nav id="main-navigation" user={AppStateStore.activeUser()}/>
          <div id="main-content">
            <Switch>
              <Route path="/pages/:pageName" component={WikiPageWrapper} />
              <Route component={HomePage} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
