var React = require('react');
var d = React.DOM;

var EditBox = React.createClass({
  displayName: 'EditBox',

  render: function() {
    return React.createElement('div',
      {
        className: 'edit-box col-1-2'
      },
      React.createElement(
        'input',
        {
          className: 'box-header',
          key: 1
        }
      ),
      React.createElement(
        'textarea', 
        {
          className: 'box-main',
          defaultValue: this.props.text,
          onChange: this.props.onBoxMainChange,
          key: 2
        }
      ),
      React.createElement(
        'button',
        {
          className: 'btn btn-save',
          onClick: this.props.onButtonClick
        }, ['Save']
      )
    );
  }
});



module.exports = EditBox;
