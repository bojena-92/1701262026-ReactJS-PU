import React from 'react';
import { getLoggedUser } from '../managers/UsersManager';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ children, ...rest }) => {
  const loggedUser = getLoggedUser();

  return (
    <Route
      {...rest}
      render={() => (loggedUser ? <Redirect to="/" /> : children)}
    />
  );
};

export default PublicRoute;
