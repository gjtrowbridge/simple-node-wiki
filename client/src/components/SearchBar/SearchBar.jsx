var React = require('react');
var PageListStore = require('../../stores/PageListStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');
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
    console.log(this.state);
    return (
      <input onChange={this.search} type="search" placeholder="Enter Search Term" />
    );
  }
});

module.exports = SearchBar;
