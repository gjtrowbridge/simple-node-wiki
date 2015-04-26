var React = require('react');
var Page = React.createClass({
  displayName: 'Page',
  render: function() {
    return React.createElement('div', null, 'Hello ', this.props.name);
  }
});

module.exports = Page;
