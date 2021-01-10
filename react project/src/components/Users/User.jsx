import React, { useState, useEffect } from 'react';
import { getUserById } from '../../managers/UsersManager';

import { useParams } from 'react-router-dom';
import TasksList from '../Tasks/TasksList';

const User = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setUser(getUserById(id));
  }, [id]);

  return (
    <div>
      <h2>Username: {user?.username}</h2>
      <h2>Email: {user?.email}</h2>
      <h2>Role: {user?.isAdmin ? 'Admin' : 'User'}</h2>
      <h2>Tasks:</h2>
      <TasksList id={id} />
    </div>
  );
};

export default User;
