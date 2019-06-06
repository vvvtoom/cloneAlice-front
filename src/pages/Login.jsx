import React from 'react';
import PropTypes from 'prop-types';
import SignIn from '../components/SignIn';


export default function Login({ loading }) {
  if (loading) return <SplashScreen />;
  return <SignIn />;
}

const SplashScreen = () => (<p>Loading...</p>);

Login.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  loading: PropTypes.bool.isRequired,
};
