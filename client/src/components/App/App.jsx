var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppStateStore = require('../../stores/AppStateStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var NotificationTopBar = require('../Notifications/NotificationTopBar.jsx');
var Nav = require('../Nav/Nav.jsx');
var Modal = require('../Modal/Modal.jsx');
var Footer = require('../Footer/Footer.jsx');
var AreaDisabler = require('../AreaDisabler/AreaDisabler.jsx');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function() {
    return {
      notifications: AppStateStore.activeNotifications(),
      modalInnerNode: AppStateStore.activeModalInnerNode()
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  componentDidMount: function() {
    AppStateStore.addChangeListener(this._onChange);
    setTimeout(function() {
      WikiPageActionCreators.checkUser();
    }, 0);
  },
  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
  },
  renderNotificationTopBar: function() {
    if (this.state.notifications.length > 0) {
      return (
        <NotificationTopBar notifications={this.state.notifications} />
      );
    } else {
      return "";
    }
  },
  renderModal: function() {
    if (this.state.modalInnerNode) {
      return <Modal innerNode={this.state.modalInnerNode} />;
    } else {
      return "";
    }
  },
  modalIsOpen: function() {
    return !!this.state.modalInnerNode;
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    return (
      <div className='app'>
        {this.renderModal()}
        <div className={this.modalIsOpen() ? "open-modal" : ""}>
          <AreaDisabler shouldDisableClicks={this.modalIsOpen()} /> 
          {this.renderNotificationTopBar()}
          <Nav id="main-navigation" user={AppStateStore.activeUser()}/>
          <div id="main-content">
            <RouteHandler {...params} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});

module.exports = App;
