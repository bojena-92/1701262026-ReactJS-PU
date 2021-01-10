import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {
  logout,
  getLoggedUser,
  isLoggedUserAdmin,
} from '../../../managers/UsersManager';

import './Header.css';

const Header = () => {
  const loggedUser = getLoggedUser();

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logoutUser = () => {
    console.log('will logout');
    logout();
    setIsLoggedOut(true);
  };

  return (
    <AppBar position="static">
      {isLoggedOut && <Redirect to="/" />}
      <Toolbar>
        <ul className="mainNav">
          {isLoggedUserAdmin() && (
            <li className="listItem">
              <NavLink to="/users" exact>
                <Button color="inherit">Users</Button>
              </NavLink>
            </li>
          )}
          {isLoggedUserAdmin() && (
            <li className="listItem">
              <NavLink to="/users/create" exact>
                <Button color="inherit">Create user</Button>
              </NavLink>
            </li>
          )}
          <li className="listItem">
            <NavLink to="/tasks" exact>
              <Button color="inherit">Tasks</Button>
            </NavLink>
          </li>
          <li className="listItem">
            <NavLink to="/tasks/create" exact>
              <Button color="inherit">Create task</Button>
            </NavLink>
          </li>
        </ul>
        <Button color="inherit" className="logoutBtn" onClick={logoutUser}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
