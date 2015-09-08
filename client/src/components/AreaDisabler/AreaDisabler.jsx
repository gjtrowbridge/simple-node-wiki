/* 
  Used to invisibly disable click events in an area.
*/

var React = require('react');

var AreaDisabler = React.createClass({
  propTypes: {
    shouldDisableClicks: React.PropTypes.bool.isRequired
  },
  stopEvent: function(e) {
    if (this.props.shouldDisableClicks) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  render: function() {
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
});

module.exports = AreaDisabler;
