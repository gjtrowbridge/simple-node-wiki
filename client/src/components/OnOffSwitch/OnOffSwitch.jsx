/*
  HTML and CSS in this component is based almost entirely on
  the example found at this link:

  https://proto.io/freebies/onoff/
*/

var React = require('react');
import PropTypes from 'prop-types';

class OnOffSwitch extends React.Component {
  render() {
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
}

OnOffSwitch.propTypes = {
  onText: PropTypes.string,
  offText: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool.isRequired,
};

OnOffSwitch.defaultProps = {
  onText: 'On',
  offText: 'Off',
  onChange: function() {}
};

export default OnOffSwitch;
