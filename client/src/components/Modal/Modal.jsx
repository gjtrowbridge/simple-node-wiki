var React = require('react');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var AreaDisabler = require('../AreaDisabler/AreaDisabler.jsx');

var Modal = React.createClass({
  PropTypes: {
    innerNode: React.PropTypes.node.isRequired
  },
  render: function() {
    return (
      <div className="modal">
        <span onClick={AppStateActionCreators.hideModal}>X</span>
        <div className="modal-inner-node">
          {this.props.innerNode}
        </div>
      </div>
    );
  }
});

module.exports = Modal;
