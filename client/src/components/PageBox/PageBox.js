var React = require('react');

var PageBox = React.createClass({
  displayName: 'PageBox',

  className: function() {
    var className = 'page-box';
    if (this.props.editing) {
      className += ' col-1-2';
    }
    return className;
  },

  render: function() {
    console.log('rendering');
    var children = [
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
          value: this.props.text ? this.props.text : undefined,
          onChange: this.props.onBoxMainChange,
          key: 2
        }
      )
    ];

    return React.createElement('div', {
      className: this.className()
    }, children);
  }
});



module.exports = PageBox;
