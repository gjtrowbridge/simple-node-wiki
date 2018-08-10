/**
  Displays sanitized raw HTML.
  
  Designed for use with the EditBox component.
*/
const React = require('react');

const DisplayBox = React.createClass({
  propTypes: {
    sanitizedHtml: React.PropTypes.string.isRequired,
    extraClasses: React.PropTypes.array
  },
  render: function() {
    let classes = ['box', 'display-box'];
    if (this.props.extraClasses) {
      classes = classes.concat(this.props.extraClasses);
    }
    const dangerousHtml = {
      __html: this.props.sanitizedHtml
    };
    return (
      <div className={classes.join(' ')}
          dangerouslySetInnerHTML={dangerousHtml} />
    );
  }
});

module.exports = DisplayBox;
