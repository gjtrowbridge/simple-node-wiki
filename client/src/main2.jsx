const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouterDom = require('react-router-dom');
const {
  BrowserRouter,
  Route,
  Link,
  Switch,
} = ReactRouterDom;
import App from 'Components/App/App.jsx';

function RootRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <RootRouter />,
  document.getElementById('mount_point'),
);
