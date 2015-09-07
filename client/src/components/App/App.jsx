var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppStateStore = require('../../stores/AppStateStore.js');
var WikiPageStore = require('../../stores/WikiPageStore.js');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var NotificationTopBar = require('../Notifications/NotificationTopBar.jsx');
var Nav = require('../Nav/Nav.jsx');
var Modal = require('../Modal/Modal.jsx');
var Footer = require('../Footer/Footer.jsx');

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
      modalInnerNode: AppStateStore.activeModalInnerNode(),
      newlyCreatedPage: WikiPageStore.newlyCreatedPage()
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  componentDidMount: function() {
    AppStateStore.addChangeListener(this._onChange);
    WikiPageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
    WikiPageStore.removeChangeListener(this._onChange);
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
    return this.state.modalInnerNode;
  },
  navigateIfNecessary: function(newlyCreatedPage) {
    if (newlyCreatedPage !== null) {
      console.log('navigating');
      this.context.router.transitionTo(
          '/pages/' + newlyCreatedPage.name);
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    this.navigateIfNecessary(nextState.newlyCreatedPage);
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    return (
      <div className={"app" + this.modalIsOpen() ? " open-modal" : ""}>
        {this.renderModal()}
        {this.renderNotificationTopBar()}
        <Nav id="main-navigation" />
        <div id="main-content">
          <RouteHandler {...params} />
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = App;
