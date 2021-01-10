import React, { useState, useEffect } from 'react';
import { getTaskById } from '../../managers/TasksManager';
import { getUserById } from '../../managers/UsersManager';
import { useParams } from 'react-router-dom';

const User = () => {
  const [task, setTask] = useState(null);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setTask(getTaskById(id));
    setAuthor(getUserById(getTaskById(id)?.authorId));
  }, [id]);

  return (
    <div>
      <h2>Title: {task?.title}</h2>
      <h2>Description: {task?.description}</h2>
      <h2>Hour rate: {task?.rate}</h2>
      <h2>Status: {task?.status}</h2>
      <h2>Author: {author?.username}</h2>
    </div>
  );
};

export default User;
