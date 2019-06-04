var React = require('react');
const { Link } = require('react-router-dom');
import PropTypes from 'prop-types';

class PagePreviewCard extends React.Component {
  render() {
    const linkTo = `/pages/${this.props.name}`;
    var link = (
      <Link key={this.props.id} to={linkTo} className="layout-fill-and-center">
        {this.props.title}
      </Link>
    );
    return (
      <div className="page-preview-card">
        {link}
      </div>
    );
  }
}

PagePreviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default PagePreviewCard;
