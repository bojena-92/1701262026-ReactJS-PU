import React from 'react';
import { getLoggedUser } from '../managers/UsersManager';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ children, ...props }) => {
  const loggedUser = getLoggedUser();
  if (props.admin && loggedUser.isAdmin) {
    return <Route {...props} render={() => children} />;
  }

  if (!props.admin && loggedUser) {
    return <Route {...props} render={() => children} />;
  }

  return <Route {...props} render={() => <Redirect to="/login" />} />;
};

export default PublicRoute;
