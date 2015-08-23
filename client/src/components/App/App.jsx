var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var AppStateStore = require('../../stores/AppStateStore.js');

var NotificationTopBar = require('../Notifications/NotificationTopBar.jsx');
var Nav = require('../Nav/Nav.jsx');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  notify: function() {
    AppStateActionCreators.showNotification('this will last 3 seconds...', 3000);
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function() {
    return {
      notifications: AppStateStore.activeNotifications(),
      modal: AppStateStore.activeModal()
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
    return (
      <div className="app" onClick={this.notify}>
        {notificationTopBar}
        <Nav />
        <RouteHandler {...params} />
      </div>
    );
  }
});

module.exports = App;
