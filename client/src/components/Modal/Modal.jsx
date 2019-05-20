var React = require('react');
import PropTypes from 'prop-types';
import AppStateActionCreators from '../../actions/AppStateActionCreators.js';
import AreaDisabler from '../AreaDisabler/AreaDisabler.jsx';
import CloseButton from '../CloseButton/CloseButton.jsx';

class Modal extends React.Component {
  render() {
    return (
      <div className="modal">
        <CloseButton onClick={AppStateActionCreators.hideModal} />
        <div className="modal-inner-node">
          {this.props.innerNode}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  innerNode: PropTypes.node.isRequired
};

export default Modal;
