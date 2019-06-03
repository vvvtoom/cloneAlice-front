import React from 'react';
import PropTypes from 'prop-types';
import SignIn from '../components/SignIn';
import { loginWithGoogle } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

const firebaseAuthKey = 'firebaseAuthInProgress';
const appTokenKey = 'appToken';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  componentWillMount() {
    const { history } = this.props;
    if (localStorage.getItem(appTokenKey)) {
      history.push('/app/home');
      return;
    }

    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.removeItem(firebaseAuthKey);
        localStorage.setItem(appTokenKey, user.uid);
        history.push('/app/home');
      }
    });
  }

  handleGoogleLogin() {
    const { history } = this.props;
    loginWithGoogle()
      .catch(() => {
        localStorage.removeItem(firebaseAuthKey);
      })
      .then(() => {
        history.push('/login');
      });
    localStorage.setItem(firebaseAuthKey, '1');
  }

  render() {
    if (localStorage.getItem(firebaseAuthKey) === '1') return <SplashScreen />;
    return <SignIn handleGoogleLogin={this.handleGoogleLogin} />;
  }
}

const SplashScreen = () => (<p>Loading...</p>);

Login.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
