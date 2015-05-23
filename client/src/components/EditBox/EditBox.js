var React = require('react');
var d = React.DOM;

var EditBox = React.createClass({
  displayName: 'EditBox',

  render: function() {
    return d.div(
      {
        className:'edit-box col-1-2'
      },
      d.textarea(
        {
          defaultValue: this.props.text,
          onChange: this.props.handleTextUpdate
        }
      ),
      d.button(
        {
          className: 'btn btn-save'
        },
        '<<'
      )
    );
  }
});



module.exports = EditBox;
