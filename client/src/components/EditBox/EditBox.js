/*
  This component is a container with an
  editable text area.

  Used in the Page component to accept
  markdown text as input, which then
  gets displayed in the DisplayBox.
*/

var React = require('react');
var d = React.DOM;

var EditBox = React.createClass({
  displayName: 'EditBox',

  render: function() {
    var classes = ['box', 'edit-box'];
    if (!this.props.editMode) {
      classes.push('edit-box-collapsed');
    }
    return d.div(
      {
        className: classes.join(' ')
      },
      d.div(
        {
          className: 'edit-box-text-container box-text-container'
        },
        d.textarea(
          {
            placeholder: 'Type in markdown here',
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
