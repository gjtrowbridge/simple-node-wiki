var React = require('react');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');

var Modal = React.createClass({
  PropTypes: {
    innerNode: React.PropTypes.node.isRequired
  },
  render: function() {
    return (
      <div className="modal">
        {this.props.innerNode}
        <span onClick={AppStateActionCreators.hideModal}>X</span>
      </div>
    );
  }
});

module.exports = Modal;
