var React = require('react');
var d = React.DOM;

var EditBox = React.createClass({
  displayName: 'EditBox',

  render: function() {
    var classes = ['edit-box'];
    if (!this.props.editMode) {
      classes.push('edit-box-collapsed');
    }
    return d.div(
      {
        className: classes.join(' ')
      },
      d.div(
        {
          className: 'edit-box-text-container'
        },
        d.textarea(
          {
            className: 'inner-text-area',
            defaultValue: this.props.text,
            onChange: this.props.handleTextUpdate
          }
        )
      ),
      d.div(
        {
          className: 'edit-box-toggle-container'
        },
        d.button(
          {
            className: 'btn btn-save vertical-center horizontal-center',
            onClick: this.props.handleToggleEditMode
          },
          this.props.editMode ? '<<' : '>>'
        )
      )
    );
  }
});



module.exports = EditBox;
