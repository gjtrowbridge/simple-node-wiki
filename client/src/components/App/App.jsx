var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppStateStore = require('../../stores/AppStateStore.js');

var NotificationTopBar = require('../Notifications/NotificationTopBar.jsx');
var Nav = require('../Nav/Nav.jsx');
var Modal = require('../Modal/Modal.jsx');

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
  },
  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    var notificationTopBar = "";
    if (this.state.notifications.length > 0) {
      notificationTopBar = (
        <NotificationTopBar notifications={this.state.notifications} />
      );
    }
    var modal = "";
    if (this.state.modalInnerNode) {
      modal = (
        <Modal innerNode={this.state.modalInnerNode} />
      );
    }
    return (
      <div className="app">
        {notificationTopBar}
        {modal}
        <Nav />
        <RouteHandler {...params} />
      </div>
    );
  }
});

module.exports = App;
