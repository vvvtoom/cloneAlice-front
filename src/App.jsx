import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import {
  Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Home, Login, Register } from './pages';
import { firebaseAuth } from './config/constants';

const customHistory = createBrowserHistory();

function PrivateRoute({
  component: Component, authed, loading, ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (authed === true
        ? <Component {...props} loading={loading} />
        // eslint-disable-next-line react/prop-types
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
    />
  );
}

PrivateRoute.propTypes = {
  authed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

function PublicRoute({
  component: Component, authed, loading, ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (authed === false
        ? <Component {...props} loading={loading} />
        : <Redirect to="/app/home" />)}
    />
  );
}

PublicRoute.propTypes = {
  authed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed, loading } = this.state;
    return (
      <Router history={customHistory}>
        <Switch>
          <PublicRoute authed={authed} loading={loading} path="/login" component={Login} />
          <PublicRoute authed={authed} loading={loading} path="/register" component={Register} />
          <PrivateRoute authed={authed} loading={loading} path="/app/home" component={Home} />
          <Redirect from="/" to="/login" />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </Router>
    );
  }
}
