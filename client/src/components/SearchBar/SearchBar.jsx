var React = require('react');
var PageListStore = require('../../stores/PageListStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');
var PagePreviewCard = require('../PagePreviewCard/PagePreviewCard.jsx');
var shared = require('../../../../shared/shared.js');

var SearchBar = React.createClass({
  getInitialState: function() {
    return this.getStateFromStores();
  },
  componentDidMount: function() {
    PageListStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PageListStore.removeChangeListener(this._onChange);
  },
  getStateFromStores: function() {
    return {
      searchResults: PageListStore.getPageList(shared.constants.SEARCH) || []
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
  render: function() {
    var searchResults = this.state.searchResults.map(function(page) {
      return (
        <li key={page.id}>
          <PagePreviewCard {...page} />
        </li>
      );
    });
    return (
      <div className="search-bar">
        <input onChange={this.search} type="search" placeholder="Enter Search Term" />
        <ul className="search-results">
          {searchResults}
        </ul>
      </div>
    );
  }
});

module.exports = SearchBar;
