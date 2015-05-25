/*
  This component is simply a bar across a container
  that shows a name/url. Used in the Page component.
  Could probably be combined with the TitleBar
  component, but keeping them separate for now
  since they may diverge more.
*/

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
          defaultValue: this.props.name ? this.props.name : '',
          disabled: true
        }
      )
    );
  }
});

module.exports = NameBar;