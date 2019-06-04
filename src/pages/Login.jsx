import React from 'react';
import PropTypes from 'prop-types';
import SignIn from '../components/SignIn';
import { loginWithGoogle, loginWithGithub } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.removeItem(firebaseAuthKey);
        localStorage.setItem(appTokenKey, user.uid);
      }
    });
  }

  handleLogin(option) {
    const { history } = this.props;
    if (option === 'google') {
      loginWithGoogle()
        .catch(() => {
          window.localStorage.removeItem(firebaseAuthKey);
        })
        .then(() => {
          history.push('/login');
        });
    } else if (option === 'github') {
      loginWithGithub()
        .catch(() => {
          window.localStorage.removeItem(firebaseAuthKey);
        })
        .then(() => {
          history.push('/login');
        });
    }
  }

  render() {
    const { loading } = this.props;
    if (loading) return <SplashScreen />;
    return <SignIn handleLogin={this.handleLogin} />;
  }
}

const SplashScreen = () => (<p>Loading...</p>);

Login.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
