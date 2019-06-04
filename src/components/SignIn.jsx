import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  socialLogin: {
    marginTop: theme.spacing(1),
  },
  socialButton: {
    marginTop: theme.spacing(1),
  },
}));

export default function SignIn({ handleLogin }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
      <Grid
        className={classes.socialLogin}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Button
          className={classes.socialButton}
          fullWidth
          variant="contained"
          onClick={() => handleLogin('google')}
        >
          Sign in with Google
        </Button>
        <Button
          className={classes.socialButton}
          fullWidth
          variant="contained"
          onClick={() => handleLogin('github')}
        >
          Sign in with Github
        </Button>
      </Grid>
    </Container>
  );
}

SignIn.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
