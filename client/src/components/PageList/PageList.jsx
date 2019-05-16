var React = require('react');
import PagePreviewCard from '../PagePreviewCard/PagePreviewCard.jsx';
import PropTypes from 'prop-types';

class PageList extends React.Component {
  render() {
    var pagePreviewCards = this.props.pages.map(function(page) {
      return (
        <li key={page.id}>
          <PagePreviewCard {...page} />
        </li>
      );
    });
    return (
      <div className="page-list">
        <h3>{this.props.title}</h3>
        <ul>
          {pagePreviewCards}
        </ul>
      </div>
    );
  }
}

PageList.propTypes = {
    pages: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
};

export default PageList;
