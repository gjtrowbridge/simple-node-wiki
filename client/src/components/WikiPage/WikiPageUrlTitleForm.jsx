// Used for creating new pages and editing the
// URL and title of existing pages
var React = require('react');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var WikiPageUrlTitleForm = React.createClass({
  PropTypes: {
    wikiPageTitle: React.PropTypes.string,
    wikiPageUrl: React.PropTypes.string,
    wikiPageText: React.PropTypes.string,
    // If null, this helps create a new page
    // If defined, this helps edit an existing page
    wikiPageId: React.PropTypes.any.isRequired
  },
  getDefaultProps: function() {
    return {
      wikiPageTitle: '',
      wikiPageUrl: '',
      wikiPageId: null,
      wikiPageText: null
    };
  },
  sendPageToServer: function() {
    var text = this.props.wikiPageText !== null ?
        this.props.wikiPageText :
        '# ' + this.refs.titleInput.getDOMNode().value
    // Create new page
    if (this.props.wikiPageId === null) {
      WikiPageActionCreators.createPage({
        name: this.refs.urlInput.getDOMNode().value,
        title: this.refs.titleInput.getDOMNode().value,
        text: text
      });
    // Edit existing page
    } else {
      WikiPageActionCreators.savePage({
        id: this.props.wikiPageId,
        name: this.refs.urlInput.getDOMNode().value,
        title: this.refs.titleInput.getDOMNode().value,
        text: text
      });
    }
  },
  render: function() {
    var header = this.props.wikiPageId === null ?
        'Create New Page' : 'Edit Page';
    return (
      <div className="wiki-page-url-title-form">
        <h3>{header}</h3>
        <label htmlFor="wiki-page-title-input">Title</label>
        <input id="wiki-page-title-input"
            ref="titleInput"
            placeholder="Enter Title"
            defaultValue={this.props.wikiPageTitle} />
        <label htmlFor="wiki-page-url-input">Page URL</label>
        <input id="wiki-page-url-input"
            ref="urlInput"
            placeholder="Enter URL"
            defaultValue={this.props.wikiPageUrl} />
        <button onClick={this.sendPageToServer}>
          {this.props.wikiPageId === null ? 'Create' : 'Update'} Page
        </button>
      </div>
    )
  }
});

module.exports = WikiPageUrlTitleForm;
