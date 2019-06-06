import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './SignIn.css';
import {
  loginWitheMail, resetPassword, loginWithGoogle, loginWithGithub,
} from '../helpers/auth';

function setErrorMsg(error) {
  return {
    loginMessage: error,
  };
}

export default class SignIn extends React.Component {
  state = {
    loginMessage: null,
    email: '',
    password: '',
  }

  handleChange = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    loginWitheMail(email, password)
      .catch(() => {
        this.setState(setErrorMsg('Invalid username/password.'));
      });
  }

  resetPassword = () => {
    const { email } = this.state;

    resetPassword(email)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${email}.`)))
      .catch(() => this.setState(setErrorMsg('Email address not found.')));
  }

  render() {
    const { email, password, loginMessage } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signin-paper">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="signin-form" onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loginMessage && (
              <div className="alert-danger">
                Error:&nbsp;
                {loginMessage}
                &nbsp;
                <Link onClick={this.resetPassword} className="alert-link">
                    Forgot Password?
                </Link>
              </div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="signin-submit"
            >
              Sign In
            </Button>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
        <Grid
          className="social-login"
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Button
            fullWidth
            variant="contained"
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={loginWithGithub}
          >
            Sign in with Github
          </Button>
        </Grid>
      </Container>
    );
  }
}
