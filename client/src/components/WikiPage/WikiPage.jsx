/**
  All documents on the wiki are displayed with this component.
*/
var React = require('react');
import PropTypes from 'prop-types';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor.jsx';
import OnOffSwitch from '../OnOffSwitch/OnOffSwitch.jsx';
import WikiPageStore from '../../stores/WikiPageStore.js';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators.js';
import WikiPageUrlTitleForm from '../WikiPage/WikiPageUrlTitleForm.jsx';
import AppStateActionCreators from '../../actions/AppStateActionCreators.js';
import WikiConstants from '../../constants/WikiConstants.js';

class WikiPage extends React.Component {
  constructor(props) {
    super(props);

    this.getStateFromStores = this.getStateFromStores.bind(this);
    this.requestPage = this.requestPage.bind(this);
    this.savePage = this.savePage.bind(this);
    this._onChange = this._onChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.onChangeViewModeToggle = this.onChangeViewModeToggle.bind(this);
    this.showEditPageModal = this.showEditPageModal.bind(this);
    this.deletePage = this.deletePage.bind(this);

    this.state = this.getStateFromStores();
  }
  getStateFromStores(overridePageName) {
    var pageName = overridePageName !== undefined ?
        overridePageName : this.props.pageName;
    var result = WikiPageStore.getByName(pageName);
    result = result === null ? {} : result;
    result.viewMode = WikiPageStore.getViewMode();
    return result;
  }
  requestPage(pageName) {
    WikiPageActionCreators.requestPage(pageName);
  }
  savePage(pageData) {
    WikiPageActionCreators.savePage(pageData);
  }
  componentWillReceiveProps(newProps) {
    // This is probably the wrong solution long-term,
    // but for the time being this fixes the issue
    // of the page not resetting state when the page name
    // changes (as happens with back/forward navigation)
    // It may be better to solve this with key props
    // in a wrapper component...?
    if (newProps.pageName !== this.state.name &&
        newProps.pageName !== undefined) {
      this.setState(this.getStateFromStores(newProps.pageName));
    }
  }
  componentWillMount() {
    var cachedPageData = this.getStateFromStores();
    if (cachedPageData.hasOwnProperty('text')) {
      this.setState(cachedPageData);
    } else {
      this.requestPage({ name: this.props.pageName });
    }
  }
  componentDidMount() {
    WikiPageStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    WikiPageStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(this.getStateFromStores());
  }
  onEditorChange(newText) {
    var pageData = {
      id: this.state.id,
      name: this.state.name,
      text: newText,
      title: this.state.title
    };
    this.savePage(pageData);
  }
  showEditPageModal() {
    var innerNode = (
      <WikiPageUrlTitleForm wikiPageTitle={this.state.title} wikiPageUrl={this.state.name}
        wikiPageId={this.state.id} wikiPageText={this.state.text} />
    );
    AppStateActionCreators.showModal(innerNode);
  }
  onChangeViewModeToggle(e) {
    var viewModeEnabled = !e.target.checked;
    WikiPageActionCreators.setViewMode(viewModeEnabled);
  }
  deletePage() {
    WikiPageActionCreators.deletePage({
      pageId: this.state.id,
      pageTitle: this.state.title
    });
  }
  render() {
    if (this.state.title !== undefined) {
      document.title = this.state.title;
    }
    var editor;
    var editButton;
    var deleteButton;
    var viewModeToggle;
    var saveStatus;
    if (this.state.text !== undefined) {
      var statusText = '';
      if (this.state.status === WikiConstants.ActionTypes.SAVE_PAGE) {
        statusText = 'Saving...';
      } else if (this.state.status === WikiConstants.ActionTypes.SAVE_PAGE_SUCCESS) {
        statusText = 'Saved!';
      }
      editor = (
        <MarkdownEditor markdownText={this.state.text} statusText={statusText}
            onChange={this.onEditorChange} viewMode={this.state.viewMode} />
      );
      viewModeToggle = <OnOffSwitch onText="EDIT MODE" offText="VIEW MODE"
          onChange={this.onChangeViewModeToggle} defaultChecked={!this.state.viewMode} />;
      editButton = <button className="btn"
          onClick={this.showEditPageModal}>Edit Name & Title</button>;
      deleteButton = <button className="btn"
          onClick={this.deletePage}>Delete Page</button>;
    } else {
      editor = 'Loading...';
      editButton = '';
      deleteButton = '';
      viewModeToggle = '';
    }

    return (
      <div className="wiki-page">
        { /* <h3>{this.props.pageName}</h3> */}
        { /* {this.state.status} */}
        {viewModeToggle}
        {editor}
        <div className={this.state.viewMode ? "hidden" : "edit-buttons layout-col-1-2"}>
          {editButton}
          {deleteButton}
        </div>
      </div>
    );
  }
}

WikiPage.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default WikiPage;
