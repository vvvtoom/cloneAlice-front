import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { logout } from '../helpers/auth';
import { firebaseAuth, ref } from '../config/constants';

const appTokenKey = 'appToken';

function firebaseGetRedirectResult() {
  firebaseAuth().getRedirectResult().then((result) => {
    const { user } = result;

    if (user) {
      const { email, uid } = user;
      let { displayName } = user;
      displayName = displayName || email.split('@')[0];
      ref.child(`users/${user.uid}/info`).once('value').then((snapshot) => {
        if (!snapshot.val()) {
          ref.child(`users/${user.uid}/info`)
            .set({
              firstName: '',
              lastName: '',
              email,
              uid,
              displayName,
            });
        }
      });
    }
  }).catch((error) => {
    const errorMessage = error.message;
    console.error(errorMessage);
  });
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    firebaseGetRedirectResult();
  }

  handleLogout() {
    const { history } = this.props;
    logout().then(() => {
      localStorage.removeItem(appTokenKey);
      history.push('/login');
    });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div>
          Home Page
        </div>
        <Button
          variant="contained"
          onClick={this.handleLogout}
        >
          logout
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
