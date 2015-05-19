var React = require('react');
var d = React.DOM;

var DisplayBox = React.createClass({
  displayName: 'DisplayBox',
  render: function() {
    var children = [
      
    ];
    return React.createElement('div', {
        className: 'display-box col-1-2'
      },
      React.createElement('input', {
        className: 'box-header',
        key: 1
      }),
      d.div({
        className: 'box-main',
        dangerouslySetInnerHTML: {
          __html: this.props.text ? this.props.text : ''
        },
        key: 2
      }),
      React.createElement(
        'button',
        {
          className: 'btn btn-edit',
          onClick: this.props.onButtonClick
        }, ['Edit']
      )
    );
  }
});



module.exports = DisplayBox;
