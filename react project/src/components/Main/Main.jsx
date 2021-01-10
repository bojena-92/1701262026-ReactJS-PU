import React from 'react';
import ProtectedRoute from '../../Routes/ProtectedRoute';
import { Switch } from 'react-router-dom';
import UsersList from '../Users/UsersList';
import User from '../Users/User';
import EditUser from '../Users/EditUser';
import TasksList from '../Tasks/TasksList';
import EditTask from '../Tasks/EditTask';
import Task from '../Tasks/Task';

const Main = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/users" admin>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute exact path="/users/create" admin>
        <EditUser />
      </ProtectedRoute>
      <ProtectedRoute exact path="/users/:id" admin>
        <User />
      </ProtectedRoute>
      <ProtectedRoute exact path="/users/edit/:id" admin>
        <EditUser />
      </ProtectedRoute>
      <ProtectedRoute exact path="/tasks">
        <TasksList />
      </ProtectedRoute>
      <ProtectedRoute exact path="/tasks/create">
        <EditTask />
      </ProtectedRoute>
      <ProtectedRoute exact path="/tasks/:id">
        <Task />
      </ProtectedRoute>
      <ProtectedRoute exact path="/tasks/edit/:id">
        <EditTask />
      </ProtectedRoute>
    </Switch>
  );
};

export default Main;
