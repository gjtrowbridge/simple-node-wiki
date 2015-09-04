var React = require('react');
var Link = require('react-router').Link;

var PagePreviewCard = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },
  render: function() {
    var link = (
      <Link key={this.props.id} to="pages" params={{pageName: this.props.name}}>
        {this.props.title}
      </Link>
    );
    return (
      <div className="page-preview-card">
        {link}
      </div>
    );
  }
});

module.exports = PagePreviewCard;
