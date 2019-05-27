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

import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/markdown/markdown.js';

class WikiPageWrapper extends React.Component {
  render() {
    return (
      <WikiPage pageName={this.props.match.params.pageName}/>
    );
  }
}

class CodeMirrorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: '#some markdown'
    }
  }
  render() {
    return (
      <CodeMirror
        value={this.state.markdown}
        onBeforeChange={(editor, data, value) => {
          this.setState({
            markdown: value,
          });
        }}
        options={{
          mode: 'markdown',
          lineNumbers: true,
        }}
      />
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
    this.state.codeVal = '# starting value from code editor';
    console.log('xcxc', this.state);
  }
  getStateFromStores() {
    return {
      notifications: AppStateStore.activeNotifications(),
      modalInnerNode: AppStateStore.activeModalInnerNode(),
    };
  }
  _onChange() {
    this.setState(this.getStateFromStores());
    this.setState({
      codeVal: 'some code val',
    });
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
      <div className='app'>
        {this.renderModal()}
        <div className={this.modalIsOpen() ? "open-modal" : ""}>
          <AreaDisabler shouldDisableClicks={this.modalIsOpen()} /> 
          {this.renderNotificationTopBar()}
          <Nav id="main-navigation" user={AppStateStore.activeUser()}/>
          <div id="main-content">
            <Switch>
              <Route path="/code" component={CodeMirrorWrapper} />
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
