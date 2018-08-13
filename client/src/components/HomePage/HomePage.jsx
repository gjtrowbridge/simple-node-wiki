var React = require('react');
var PageList = require('../PageList/PageList.jsx');
var shared = require('../../../../shared/shared.js');
var PageListStore = require('../../stores/PageListStore');
var AppStateStore = require('../../stores/AppStateStore');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      recentlyModifiedPageList: [],
      recentlyCreatedPageList: [],
    };
  },
  componentWillMount: function() {
    // Certain actions trigger transitions mid-action, so all
    // on-page-load actions must be given setTimeouts to prevent
    // attempting to create a new action while another is happening
    setTimeout(function() {
      WikiPageActionCreators.requestPageList({
        pageListType: shared.constants.ORDER_BY_MODIFIED
      });
      WikiPageActionCreators.requestPageList({
        pageListType: shared.constants.ORDER_BY_CREATED
      });
    }, 0);
  },
  componentDidMount: function() {
    PageListStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    PageListStore.removeChangeListener(this._onChange);
  },
  getStateFromStores: function() {
    return {
      recentlyModifiedPageList: PageListStore.getPageList(shared.constants.ORDER_BY_MODIFIED) || [],
      recentlyCreatedPageList: PageListStore.getPageList(shared.constants.ORDER_BY_CREATED) || [],
    }
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  render: function() {
    document.title = 'Simple Wiki';
    return (
      <div className="home-page">
        <p>Welcome to the "personal wiki" application.</p>
        <p>
          Create new pages by clicking "+ New Page" in the top right,
          or find existing pages using the search box or the lists
          below.
        </p>
        <PageList title={'Recently Modified Pages (' + (AppStateStore.activeUser() || 'Must Log In To View')  + ')'} pages={this.state.recentlyModifiedPageList} />
        <PageList title={'Recently Created Pages (' + (AppStateStore.activeUser() || 'Must Log In To View')  + ')'} pages={this.state.recentlyCreatedPageList} />
        <p>
          To learn more about this application or make suggestions,
          check out the github page
          <a target="_blank" href="https://github.com/gjtrowbridge/simple-node-wiki"> here</a>
        </p>
      </div>
    );
  }
});

module.exports = HomePage;
