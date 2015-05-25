var React = require('react');
var d = React.DOM;

var NameBar = React.createClass({
  displayName: 'NameBar',
  render: function() {
    return d.div(
      {
        className: 'bar name-bar'
      },
      d.input(
        {
          defaultValue: this.props.name ? this.props.name : ''
        }
      )
    );
  }
});

module.exports = NameBar;