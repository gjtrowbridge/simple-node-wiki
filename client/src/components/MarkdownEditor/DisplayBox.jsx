/**
  Displays sanitized raw HTML.
  
  Designed for use with the EditBox component.
*/
const React = require('react');
import PropTypes from 'prop-types';

class DisplayBox extends React.Component {
  render() {
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
}

DisplayBox.propTypes = {
  sanitizedHtml: PropTypes.string.isRequired,
  extraClasses: PropTypes.array,
};

export default DisplayBox;
