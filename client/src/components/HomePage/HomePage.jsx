var React = require('react');
import PageList from '../PageList/PageList.jsx';
import shared from 'Src/utils/shared_port.js';
import PageListStore from '../../stores/PageListStore';
import AppStateStore from '../../stores/AppStateStore';
import WikiPageActionCreators from '../../actions/WikiPageActionCreators.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyModifiedPageList: [],
      recentlyCreatedPageList: [],
    };
    this._onChange = this._onChange.bind(this);
  }
  getStateFromStores() {
    return {
      recentlyModifiedPageList: PageListStore.getPageList(shared.constants.ORDER_BY_MODIFIED) || [],
      recentlyCreatedPageList: PageListStore.getPageList(shared.constants.ORDER_BY_CREATED) || [],
    }
  }
  componentWillMount() {
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
  }
  componentDidMount() {
    PageListStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    PageListStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(this.getStateFromStores());
  }
  render() {
    document.title = 'Simple Wiki';
    if (AppStateStore.activeUser()) {
      const activeUserNote = '(' + AppStateStore.activeUser().email + ')';
      return (
        <div className="home-page">
          <p>Welcome to the "personal wiki" application.</p>
          <p>
            Create new pages by clicking "+ New Page" in the top right,
            or find existing pages using the search box or the lists
            below.
          </p>
          <PageList title={'Recently Modified Pages ' + activeUserNote} pages={this.state.recentlyModifiedPageList} />
          <PageList title={'Recently Created Pages ' + activeUserNote} pages={this.state.recentlyCreatedPageList} />
          <p>
            To learn more about this application or make suggestions,
            check out the github page <a target="_blank" href="https://github.com/gjtrowbridge/simple-node-wiki">here</a>.
          </p>
        </div>
      );
    } else {
      return (
        <div className="home-page">
          <h1>Welcome to the simple-node-wiki</h1>
          <p>This application is for note-taking and journaling.</p>
          <p>Users can create new content using <a target="_blank" href="https://www.markdownguide.org/getting-started/">markdown syntax.</a></p>
          <p><a href="_auth/google/callback">Log in</a> to try it out for yourself, look up the source code <a target="_blank" href="https://github.com/gjtrowbridge/simple-node-wiki">here</a>, or check out the demo video below:</p>
          <img className="demo-gif" src="https://user-images.githubusercontent.com/931171/59230560-ad455900-8b92-11e9-936d-0b8ac1f6a958.gif" />
        </div>
      );
    }
  }
}

export default HomePage;
