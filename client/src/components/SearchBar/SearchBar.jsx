var React = require('react');
var PageListStore = require('../../stores/PageListStore.js');
var AppStateStore = require('../../stores/AppStateStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');
var AppStateActionCreators = require('../../actions/AppStateActionCreators.js');
var PagePreviewCard = require('../PagePreviewCard/PagePreviewCard.jsx');
var shared = require('../../../../shared/shared.js');

var SearchBar = React.createClass({
  getInitialState: function() {
    return this.getStateFromStores();
  },
  componentDidMount: function() {
    PageListStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PageListStore.removeChangeListener(this._onChange);
    AppStateStore.removeChangeListener(this._onChange);
  },
  getStateFromStores: function() {
    return {
      searchResults: PageListStore.getPageList(shared.constants.SEARCH) || [],
      searchResultsAreEnabled: AppStateStore.searchResultsAreEnabled()
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  search: function(e) {
    WikiPageActionCreators.searchPages({
      searchTerm: e.target.value
    });
  },
  disableSearchResults: function() {
    setTimeout(function() {
      AppStateActionCreators.toggleSearchResults(false);
    }, 100)
  },
  enableSearchResults: function() {
    AppStateActionCreators.toggleSearchResults(true);
  },
  render: function() {
    var searchResults = this.state.searchResults.map(function(page) {
      return (
        <li className="search-result" key={page.id}>
          <PagePreviewCard {...page} />
        </li>
      );
    });
    var searchResultsClasses = ['search-results'];
    if (!this.state.searchResultsAreEnabled) {
      searchResultsClasses.push('hidden');
    }
    return (
      <div className="search-bar" onFocus={this.enableSearchResults} onBlur={this.disableSearchResults} >
        <input onChange={this.search} type="search" placeholder="Enter Search Term" />
        <ul className={searchResultsClasses.join(' ')}>
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = SearchBar;
