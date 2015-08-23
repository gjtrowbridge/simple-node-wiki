// Used for creating new pages and editing the
// URL and title of existing pages

var React = require('react');

var WikiPageUrlTitleForm = React.createClass({
  PropTypes: {
    title: React.PropTypes.string,
    wikiPageUrl: React.PropTypes.string,
    // If null, this helps create a new page
    // If defined, this helps edit an existing page
    wikiPageId: React.PropTypes.any
  },
  getDefaultProps: function() {
    return {
      title: '',
      wikiPageUrl: '',
      wikiPageId: null
    };
  },
  render: function() {
    return (
      <div className="wiki-page-url-title-form">
        <label for="wiki-page-title-input">Title</label>
        <input id="wiki-page-title-input"
            placeholder="Enter Title"
            value={this.props.title} />
        <label for="wiki-page-url-input">Page URL</label>
        <input id="wiki-page-url-input"
            placeholder="Enter URL"
            value={this.props.wikiPageUrl} />
        <button>
          {this.props.wikiPageId === null ? 'Create' : 'Update'} Page
        </button>
      </div>
    )
  }
});

module.exports = WikiPageUrlTitleForm;
