/*
  HTML and CSS in this component is based almost entirely on
  the example found at this link:

  https://proto.io/freebies/onoff/
*/

var React = require('react');

var OnOffSwitch = React.createClass({
  propTypes: {
    onText: React.PropTypes.string,
    offText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    defaultChecked: React.PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return {
      onText: 'On',
      offText: 'Off',
      onChange: function() {}
    }
  },
  render: function() {
    return (
      <div className="onoffswitch">
        <input type="checkbox" name="onoffswitch" onChange={this.props.onChange}
            className="onoffswitch-checkbox" id="myonoffswitch"
            defaultChecked={this.props.defaultChecked} />
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
