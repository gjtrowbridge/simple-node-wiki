var React = require('react');

// Custom Components
var Page = require('../Page/Page.js');
var HomePage = require('../HomePage/HomePage.js')

// Create and render container app
var App = React.createClass({
  displayName: 'App',
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var pageName = this.context.router.getCurrentPath();
    if (pageName === '/') {
      return React.createElement(HomePage, {

      });
    } else {
      return React.createElement(Page, {
        apiUrlForPageName: '/_api/pages/name',
        apiUrl: '/_api/pages',
        pageName: pageName
      });
    }
  }
});

module.exports = App;
