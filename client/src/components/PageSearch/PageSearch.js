var React = require('react');
var d = React.DOM;

var PageSearch = React.createClass({
  displayName: 'PageSearch',
  render: function() {
    return d.input(      
      {
        type: 'search',
        className: 'page-search horizontal-center',
        placeholder: 'Search Pages'
      }
    );
  }
});

module.exports = PageSearch;
