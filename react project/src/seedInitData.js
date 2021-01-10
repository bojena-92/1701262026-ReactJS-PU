import { v4 as uuidv4 } from 'uuid';

export const seedInitData = () => {
  const initUsers = [
    {
      id: uuidv4(),
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin1',
      isAdmin: true,
    },
    {
      id: uuidv4(),
      username: 'test',
      email: 'test@test.com',
      password: 'test12',
      isAdmin: false,
    },
  ];

  const initTasks = [
    {
      id: uuidv4(),
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
      rate: '1',
      status: 'Pending',
      authorId: initUsers[0].id,
    },
    {
      id: uuidv4(),
      title: 'Walk the dog',
      description: 'Take the dog for a walk',
      rate: '2',
      status: 'Done',
      authorId: initUsers[1].id,
    },
  ];

  localStorage.setItem('Users', JSON.stringify(initUsers));
  localStorage.setItem('Tasks', JSON.stringify(initTasks));
};
