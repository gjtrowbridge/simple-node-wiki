var React = require('react');
var Page = require('./Page.js');

React.render(
  React.createElement(Page, {
    name: 'Greg'
  }),
  document.getElementById('mount_point')
);
