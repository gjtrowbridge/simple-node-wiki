var React = require('react');
var d = React.DOM;

var TitleBar = React.createClass({
  displayName: 'TitleBar',
  render: function() {
    return d.div(
      {
        className: 'bar title-bar'
      },
      d.input(
        {
          defaultValue: this.props.title ? this.props.title : ''
        }
      )
    );
  }
});

module.exports = TitleBar;
