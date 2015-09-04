var React = require('react');
var PagePreviewCard = require('../PagePreviewCard/PagePreviewCard.jsx');

var PageList = React.createClass({
  propTypes: {
    pages: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired
  },
  render: function() {
    var pagePreviewCards = this.props.pages.map(function(page) {
      return (
        <li>
          <PagePreviewCard {...page} key={page.id} />
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
});

module.exports = PageList;
