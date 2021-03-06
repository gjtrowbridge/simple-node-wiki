import { createBrowserHistory } from 'history';


let history = undefined;

// Hacky global variable storage to prevent
// the need for larger rewrites of transitionTo logic
// setHistory should be called before transitionTo is used
const setHistory = (h) => {
  history = h;
};
const transitionTo = (url, useReplace = false) => {
  if (useReplace) {
    history.replace(url);
  } else {
    history.push(url);
  }
};

export { setHistory, transitionTo };
