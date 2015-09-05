var React = require('react');
var PageList = require('../PageList/PageList.jsx');
var shared = require('../../../../shared/shared.js');
var PageListStore = require('../../stores/PageListStore.js');
var WikiPageActionCreators = require('../../actions/WikiPageActionCreators.js');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      recentlyModifiedPageList: [],
      recentlyCreatedPageList: []
    };
  },
  componentWillMount: function() {
    WikiPageActionCreators.requestPageList({
      pageListType: shared.constants.ORDER_BY_MODIFIED
    });
    WikiPageActionCreators.requestPageList({
      pageListType: shared.constants.ORDER_BY_CREATED
    });
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
      recentlyCreatedPageList: PageListStore.getPageList(shared.constants.ORDER_BY_CREATED) || []
    }
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  render: function() {
    console.log(this.state.recentlyModifiedPageList);
    return (
      <div className="home-page">
        Home page!
        <PageList title="Recently Modified Pages" pages={this.state.recentlyModifiedPageList} />
        <PageList title="Recently Created Pages" pages={this.state.recentlyCreatedPageList} />
      </div>
    );
  }
});

module.exports = HomePage;
