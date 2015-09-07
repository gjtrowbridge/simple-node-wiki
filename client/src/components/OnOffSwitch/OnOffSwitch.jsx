/*
  HTML and CSS in this component is based almost entirely on
  the example found at this link:

  https://proto.io/freebies/onoff/
*/

var React = require('react');

var OnOffSwitch = React.createClass({
  propTypes: {
    onText: React.PropTypes.string,
    offText: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      onText: 'On',
      offText: 'Off'
    }
  },
  render: function() {
    return (
      <div className="onoffswitch">
        <input type="checkbox" name="onoffswitch"
            className="onoffswitch-checkbox" id="myonoffswitch" />
        <label className="onoffswitch-label" htmlFor="myonoffswitch">
          <span className="onoffswitch-inner"
              data-on-text={this.props.onText}
              data-off-text={this.props.offText}></span>
          <span className="onoffswitch-switch"></span>
        </label>
      </div>
    );
  }
});

module.exports = OnOffSwitch;
