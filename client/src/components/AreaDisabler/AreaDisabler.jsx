/* 
  Used to invisibly disable click events in an area.
*/

var React = require('react');
import PropTypes from 'prop-types';

class AreaDisabler extends React.Component {
  constructor(props) {
    super(props);
    this.stopEvent = this.stopEvent.bind(this);
  }
  stopEvent(e) {
    if (this.props.shouldDisableClicks) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  render() {
    var classes = ['area-disabler'];
    if (!this.props.shouldDisableClicks) {
      classes.push('hidden');
    }
    return (
      <div className={classes.join(' ')}
          onClickCapture={this.stopEvent}
          onDoubleClickCapture={this.stopEvent}
          onFocusCapture={this.stopEvent}
          onBlurCapture={this.stopEvent}
          onChangeCapture={this.stopEvent}
          onInputCapture={this.stopEvent}
          onSubmitCapture={this.stopEvent}>
        {this.props.children}
      </div>
    );
  }
}
AreaDisabler.propTypes = {
  shouldDisableClicks: PropTypes.bool.isRequired
};

export default AreaDisabler;
