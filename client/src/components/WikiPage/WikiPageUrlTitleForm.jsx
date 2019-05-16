// Used for creating new pages and editing the
// URL and title of existing pages
var React = require('react');
import WikiPageActionCreators from '../../actions/WikiPageActionCreators.js';
import { transitionTo } from 'Src/utils/HistoryContainer';
import PropTypes from 'prop-types';

class WikiPageUrlTitleForm extends React.Component {
  constructor(props) {
    super(props);
    this.sendPageToServer = this.sendPageToServer.bind(this);
  }
  sendPageToServer() {
    var text = this.props.wikiPageText !== null ?
        this.props.wikiPageText :
        '# ' + this.refs.titleInput.getDOMNode().value;
    // Create new page
    if (this.props.wikiPageId === null) {
      var name = this.refs.urlInput.getDOMNode().value;
      var title = this.refs.titleInput.getDOMNode().value;
      WikiPageActionCreators.createPage({
        name: name,
        title: title,
        text: text,
        onSuccess: function() {
          transitionTo('/pages/' + name);
        }
      });
    // Edit existing page
    } else {
      var newName = this.refs.urlInput.getDOMNode().value
      var newTitle = this.refs.titleInput.getDOMNode().value
      var onSuccess = function() {
        transitionTo('/pages/' + newName);
      }.bind(this);

      WikiPageActionCreators.savePage({
        id: this.props.wikiPageId,
        name: newName,
        title: newTitle,
        text: text,
      }, onSuccess);
    }
  }
  render() {
    var header = this.props.wikiPageId === null ?
        'Create New Page' : 'Edit Page';
    return (
      <div className="wiki-page-url-title-form">
        <h3>{header}</h3>
        <label className="wiki-page-url-title-form-label"
            htmlFor="wiki-page-title-input">Title</label>
        <input id="wiki-page-title-input"
            className="wiki-page-url-title-form-input"
            ref="titleInput"
            placeholder="Enter Title"
            defaultValue={this.props.wikiPageTitle} />
        <label className="wiki-page-url-title-form-label"
            htmlFor="wiki-page-url-input">Page URL</label>
        <input id="wiki-page-url-input"
            className="wiki-page-url-title-form-input"
            ref="urlInput"
            placeholder="Enter URL"
            defaultValue={this.props.wikiPageUrl} />
        <button className="btn wiki-page-url-title-form-btn"
            onClick={this.sendPageToServer}>
          {this.props.wikiPageId === null ? 'Create' : 'Update'} Page
        </button>
      </div>
    )
  }
}

WikiPageUrlTitleForm.propTypes = {
  wikiPageTitle: PropTypes.string,
  wikiPageUrl: PropTypes.string,
  wikiPageText: PropTypes.string,
  // If null, this helps create a new page
  // If defined, this helps edit an existing page
  wikiPageId: PropTypes.any.isRequired
};

WikiPageUrlTitleForm.defaultProps = {
  wikiPageTitle: '',
  wikiPageUrl: '',
  wikiPageId: null,
  wikiPageText: null,
};

export default WikiPageUrlTitleForm;
