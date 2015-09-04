// Used for creating new pages and editing the
// URL and title of existing pages
var React = require('react');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var WikiPageUrlTitleForm = React.createClass({
  PropTypes: {
    title: React.PropTypes.string,
    wikiPageUrl: React.PropTypes.string,
    // If null, this helps create a new page
    // If defined, this helps edit an existing page
    wikiPageId: React.PropTypes.any.isRequired
  },
  getDefaultProps: function() {
    return {
      title: '',
      wikiPageUrl: '',
      wikiPageId: null
    };
  },
  sendPageToServer: function() {
    // Create new page
    if (this.props.wikiPageId === null) {
      WikiPageActionCreators.createPage({
        name: this.refs.urlInput.getDOMNode().value,
        title: this.refs.titleInput.getDOMNode().value,
        text: "# " + this.refs.titleInput.getDOMNode().value
      });
    // Edit existing page
    } else {
      
    }
  },
  render: function() {
    console.log('rendering');
    return (
      <div className="wiki-page-url-title-form">
        <label htmlFor="wiki-page-title-input">Title</label>
        <input id="wiki-page-title-input"
            ref="titleInput"
            placeholder="Enter Title"
            defaultValue={this.props.title} />
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
