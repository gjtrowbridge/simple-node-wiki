const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouterDom = require('react-router-dom');
const { BrowserRouter, Route, Link } = ReactRouterDom;
import Nav from 'Components/Nav/Nav.jsx';
import AppStateStore from 'Stores/AppStateStore.js';

class Example extends React.Component {
  render() {
    return (
      <div>
        This is a rendered component1234!
      </div>
    )
  }
}

class Example2 extends React.Component {
  render() {
    return (
      <div>
        This is the second example!
      </div>
    )
  }
}

function RootRouter() {
  return (
    <BrowserRouter>
      <Nav id="main-navigation" user={AppStateStore.activeUser()}/>
      <Route path="/" exact component={Example} />
      <Route path="/example2" component={Example2} />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <RootRouter />,
  document.getElementById('mount_point'),
);
