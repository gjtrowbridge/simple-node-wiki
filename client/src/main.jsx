const React = require('react');
const ReactRouterDom = require('react-router-dom');
const Router = ReactRouterDom.BrowserRouter;
const Route = ReactRouterDom.Route;
const DefaultRoute = ReactRouterDom.DefaultRoute;
const NotFoundRoute = ReactRouterDom.NotFoundRoute;
const AppStateActionCreators = require('./actions/AppStateActionCreators.js');
const RouterContainer = require('./utils/RouterContainer.js');

const App = require('./components/App/App.jsx');
const HomePage = require('./components/HomePage/HomePage.jsx');
const WikiPage = require('./components/WikiPage/WikiPage.jsx');

const routes = (
  <Route handler={App}>
    <DefaultRoute name="home" handler={HomePage} />
    <Route name="pages" path="pages/:pageName" handler={WikiPage} />
    <NotFoundRoute handler={HomePage}/>
  </Route>
);

const router = Router.run(
      routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler />, document.body);

  // Certain actions trigger transitions mid-action, so all
  // on-page-load actions must be given setTimeouts to prevent
  // attempting to create a new action while another is happening
  setTimeout(function() {
    AppStateActionCreators.pageTransition({
      handler: Handler,
      state: state
    });
  }, 0);
});

RouterContainer.setRouter(router);
