/*
  This component is simply a bar across a container
  that shows the text of a title.
  Used in the Page component.
*/

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
          defaultValue: this.props.title ? this.props.title : '',
          onChange: this.props.handleTitleUpdate,
          placeholder: this.props.placeholder
        }
      )
    );
  }
});

module.exports = TitleBar;
