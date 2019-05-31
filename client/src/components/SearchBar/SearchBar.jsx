var React = require('react');
import PageListStore from '../../stores/PageListStore.js';
import AppStateStore from '../../stores/AppStateStore.js';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators.js';
import AppStateActionCreators from '../../actions/AppStateActionCreators.js';
import PagePreviewCard from '../PagePreviewCard/PagePreviewCard.jsx';
import shared from 'Src/utils/shared_port.js';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = this.getStateFromStores();
  }
  getStateFromStores() {
    return {
      searchResults: PageListStore.getPageList(shared.constants.SEARCH) || [],
      searchResultsAreEnabled: AppStateStore.searchResultsAreEnabled()
    };
  }
  search(e) {
    WikiPageActionCreators.searchPages({
      searchTerm: e.target.value
    });
  }
  enableSearchResults() {
    AppStateActionCreators.toggleSearchResults(true);
  }
  disableSearchResults() {
    setTimeout(function() {
      AppStateActionCreators.toggleSearchResults(false);
    }, 100)
  }
  componentDidMount() {
    PageListStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    PageListStore.removeChangeListener(this._onChange);
    AppStateStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(this.getStateFromStores());
  }
  render() {
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
}

export default SearchBar;
