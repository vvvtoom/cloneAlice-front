import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './SignIn.css';
import { auth } from '../helpers/auth';

function setErrorMsg(error) {
  return {
    registerError: error.message,
  };
}

export default class SignUp extends React.Component {
  state = {
    registerError: null,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit = (e) => {
    const {
      email, password, firstName, lastName,
    } = this.state;
    e.preventDefault();
    auth(email, password, { firstName, lastName })
      .catch(err => this.setState(setErrorMsg(err)));
  }

  render() {
    const {
      email, password, registerError, firstName, lastName,
    } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signin-paper">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="signin-form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                />
              </Grid>
            </Grid>
            {registerError && (
              <div className="alert-danger">
                Error:&nbsp;
                {registerError}
              </div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="signin-submit"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
