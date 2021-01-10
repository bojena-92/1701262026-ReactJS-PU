import { useState } from 'react';
import { editUser } from '../../../managers/UsersManager';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const registerResult = editUser({
        username,
        email,
        password,
      });

      if (registerResult) {
        setIsLoggedIn(registerResult);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid container>
      {isLoggedIn && <Redirect to="/login" />}

      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        alignContent="center"
        style={{ height: '100vh' }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container component="div" style={{ padding: '10px 0' }}>
            <TextField
              id="standard-basic"
              label="Username"
              value={username}
              onChange={onUsernameChange}
            />
          </Grid>

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

          <Grid container component="div" style={{ padding: '10px 0' }}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
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

export default Register;
