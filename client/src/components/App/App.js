var React = require('react');
var d = React.DOM;

// Custom Components
var Page = require('../Page/Page.js');
var HomePage = require('../HomePage/HomePage.js');
var Nav = require('../Nav/Nav.js');

// Create and render container app
var App = React.createClass({
  displayName: 'App',
  contextTypes: {
    router: React.PropTypes.func
  },
  getPageElement: function() {
    var pageName = this.context.router.getCurrentPath();
    if (pageName === '/') {
      return React.createElement(HomePage);
    } else {
      return React.createElement(Page, {
        apiUrlForPageName: '/_api/pages/name',
        apiUrl: '/_api/pages',
        pageName: pageName
      });
    }
  },
  render: function() {
    return d.div(
      {
        className: 'app'
      },
      React.createElement(Nav, {
        apiUrl: '/_api/pages'
      }),
      this.getPageElement()
    );
  }
});

module.exports = App;
