import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './pages/Home';
import Login from './pages/Login';
import * as serviceWorker from './serviceWorker';

const customHistory = createBrowserHistory();
const Root = () => (
  <Router history={customHistory}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/app/home" component={Home} />
      <Redirect exact from="/" to="/login" />
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
