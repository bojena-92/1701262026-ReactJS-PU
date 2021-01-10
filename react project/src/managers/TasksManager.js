import { getUsers } from './UsersManager';
import { v4 as uuidv4 } from 'uuid';

export const tasksStatus = {
  active: 'Active',
  pending: 'Pending',
  done: 'Done',
};

export const getTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('Tasks'));
  const users = getUsers();

  return tasks.map((task) => ({
    ...task,
    author: users.find((u) => u.id === task.authorId),
  }));
};

export const setTasks = (tasks) => {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
};

export const getTasksForUser = (userId) => {
  const tasks = getTasks();

  return tasks.filter((t) => t.authorId === userId);
};

export const getTaskById = (taskId) => {
  const tasks = getTasks();

  return tasks.find((t) => t.id === taskId);
};

export const deleteTasksForUser = (userId) => {
  const tasks = getTasks();

  setTasks(tasks.filter((t) => t.authorId !== userId));
};

export const deleteTaskById = (id) => {
  const task = getTaskById(id);

  if (task) {
    setTasks(getTasks().filter((t) => t.id !== task.id));
  }
};

export const createTask = (data) => {
  if (!data.title) {
    throw new Error('Missing title!');
  }
  if (!data.description) {
    throw new Error('Missing description!');
  }
  if (!data.rate) {
    throw new Error('Missing rate!');
  }
  if (!data.status) {
    throw new Error('Missing status!');
  }

  console.log('incoming data', data);
  const existingTask = getTaskById(data.id);
  let task;

  if (existingTask) {
    console.log('1');
    task = {
      ...data,
    };

    setTasks(getTasks().map((t) => (t.id === task.id ? task : t)));
  } else {
    console.log('2');

    task = {
      ...data,
      id: data.id || uuidv4(),
      status: data.status || tasksStatus.pending,
    };

    console.log('new task', task);

    setTasks([...getTasks(), task]);
  }

  return true;
};
