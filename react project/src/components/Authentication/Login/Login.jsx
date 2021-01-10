import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../../managers/UsersManager';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      const loggedUser = login({
        email,
        password,
      });

      setIsLoggedIn(loggedUser);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid container>
      {isLoggedIn && <Redirect to="/" />}

      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        alignContent="center"
        style={{ height: '100vh' }}
      >
        <form onSubmit={handleFormSubmit}>
          {/* <label htmlFor="email">Email: </label>
          <Input type="email" name="email" id="email" /> */}

          <Grid container component="div" style={{ padding: '10px 0' }}>
            <TextField
              id="standard-basic"
              type="email"
              label="Email"
              value={email}
              onChange={onEmailChange}
            />
          </Grid>

          <Grid container component="div" style={{ padding: '10px 0' }}>
            <TextField
              id="standard-basic"
              type="password"
              label="Password"
              value={password}
              onChange={onPasswordChange}
            />
          </Grid>

          <Grid container component="div">
            <Grid component="div" item xs={8}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>

            <Grid component="div" item xs={4}>
              <Link to="/register">Register</Link>
            </Grid>
          </Grid>

          <Grid
            container
            component="div"
            style={{ color: 'red', margin: '10px 0' }}
          >
            {errorMessage && <div>{errorMessage}</div>}
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
