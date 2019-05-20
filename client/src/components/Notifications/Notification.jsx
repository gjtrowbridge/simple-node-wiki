var React = require('react');
import AppStateActionCreators from '../../actions/AppStateActionCreators.js';
import CloseButton from '../CloseButton/CloseButton.jsx';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }
  remove() {
    AppStateActionCreators.hideNotification(this.props.notificationId);
  }
  render() {
    return (
      <li className="notification">
        {this.props.text}
        <CloseButton onClick={this.remove} />
      </li>
    );
  }
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
  notificationId: PropTypes.number.isRequired,
};

export default Notification;
