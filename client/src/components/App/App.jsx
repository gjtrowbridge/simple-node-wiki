var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var PageStoreActionCreators = require('../../actions/PageStoreActionCreators.js');
var PageStateStore = require('../../stores/PageStateStore.js');

var NotificationBar = require('../NotificationBar/NotificationBar.jsx');
var Nav = require('../Nav/Nav.jsx');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  notify: function() {
    PageStoreActionCreators.showNotification('this will last 3 seconds...', 3000);
  },
  getInitialState: function() {
    return this.getStateFromStores();
  },
  getStateFromStores: function() {
    return {
      notifications: PageStateStore.activeNotifications(),
      modal: PageStateStore.activeModal()
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  componentDidMount: function() {
    PageStateStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PageStateStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var params = this.context.router.getCurrentParams();
    var notifications = (
      <ul className="notifications">
        {this.state.notifications.map(function(notification) {
          console.log(notification.notificationId);
          return (
            <NotificationBar text={notification.text}
                key={notification.notificationId}
                notificationId={notification.notificationId} />
          );
        })}
      </ul>
    );
    return (
      <div className="app" onClick={this.notify}>
        {notifications}
        <Nav />
        <RouteHandler {...params} />
      </div>
    );
  }
});

module.exports = App;
