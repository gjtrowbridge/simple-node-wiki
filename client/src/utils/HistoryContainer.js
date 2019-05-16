import { createBrowserHistory } from 'history';


const history = createBrowserHistory();
const transitionTo = (url) => {
  history.push(url);
};

export { transitionTo };
export default history;
