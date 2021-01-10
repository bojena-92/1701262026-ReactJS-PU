import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getUserById, editUser } from '../../managers/UsersManager';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../index.css';

const EditUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [editSuccessful, setEditSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const user = getUserById(id);
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password);
      setIsAdmin(user.isAdmin);
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    }
  }, [id]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleViewPasswordChange = (e) => {
    setViewPassword(e.target.checked);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    try {
      console.log('object');
      const editResult = editUser({
        id,
        username,
        password,
        email,
        isAdmin,
      });

      if (editResult) {
        setEditSuccessful(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid container>
      {editSuccessful && <Redirect to="/users" />}

      <Grid container item xs={12} justify="center" className="formContainer">
        <form onSubmit={handleSubmitForm} className="form">
          <Grid container item xs={12}>
            <TextField
              id="standard-basic"
              label="Username"
              onChange={handleUsernameChange}
              value={username}
              className="formInputContainer"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              id="standard-basic"
              type="email"
              label="Email"
              onChange={handleEmailChange}
              value={email}
              className="formInputContainer"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                type={viewPassword ? 'text' : 'password'}
                label="Password"
                onChange={handlePasswordChange}
                value={password}
                className="formInputContainer"
              />
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleViewPasswordChange}
                  checked={viewPassword}
                  id="viewPassword"
                  name="viewPassword"
                />
              }
              label="View password"
            />
          </Grid>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleIsAdminChange}
                  checked={isAdmin}
                  id="isAdmin"
                  name="isAdmin"
                />
              }
              label="Admin"
            />
          </div>
          <Grid container item xs={12} style={{ margin: '20px 0' }}>
            {errorMessage && (
              <div className="errorMessageText">{errorMessage}</div>
            )}
          </Grid>

          <Grid container item xs={12} style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditUser;
