import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { logout } from '../helpers/auth';

const appTokenKey = 'appToken';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
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
