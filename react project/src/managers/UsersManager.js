import { v4 as uuidv4 } from 'uuid';
import { deleteTasksForUser } from './TasksManager';

console.log('id', uuidv4());
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('Users'));
};

export const setUsers = (users) => {
  localStorage.setItem('Users', JSON.stringify(users));
};

// export const register = (data) => {
//   // get all users and check if user exists

//   if (!data) {
//     throw new Error('Empty user object passed!');
//   }
//   if (!data.username) {
//     throw new Error('Empty username!');
//   }
//   if (!data.email) {
//     throw new Error('Empty email!');
//   }
//   if (!data.password) {
//     throw new Error('Empty password!');
//   }

//   const userObj = {
//     ...data,
//     id: data.id || uuidv4(),
//     isAdmin: data.isAdmin || false,
//   };

//   const users = getUsers();

//   users.push(userObj);

//   setUsers(users);

//   return true;

//   // return upsertLoggedUser(userObj);
// };

export const getUserById = (userId) => {
  const users = getUsers();

  return users.find((u) => u.id === userId);
};

export const getUserByEmail = (email) => {
  const users = getUsers();

  return users.find((u) => u.email === email);
};

export const getLoggedUser = () => {
  console.log('logged user', localStorage.getItem('loggedUser'));
  return JSON.parse(localStorage.getItem('loggedUser'));
};

export const deleteUserById = (id) => {
  const user = getUserById(id);
  const users = getUsers();

  if (user) {
    deleteTasksForUser(user.id);
    setUsers(users.filter((u) => u.id !== user.id));
  }
};

export const editUser = (data) => {
  if (!data.username) {
    throw new Error('Empty username!');
  }
  if (!data.email) {
    throw new Error('Empty email!');
  }
  if (!data.password) {
    throw new Error('Empty password!');
  }
  if (data.password.length < 6) {
    throw new Error('Password must be at least six chars long!');
  }

  const existingUser = getUserById(data.id);
  let user;

  if (existingUser) {
    console.log('1');
    user = {
      ...data,
    };

    setUsers(getUsers().map((u) => (u.id === user.id ? user : u)));
  } else {
    console.log('2');

    const existingUserByEmail = getUserByEmail(data.email);
    if (existingUserByEmail) {
      throw new Error('User with that email already exists!');
    }

    user = {
      ...data,
      id: uuidv4(),
      isAdmin: data.isAdmin || false,
    };

    console.log('new user', user);

    if (!getLoggedUser()) {
      setLoggedUser(user);
    }

    setUsers([...getUsers(), user]);
  }

  return true;
};

export const logout = () => {
  localStorage.removeItem('loggedUser');
};

export const setLoggedUser = (user) => {
  localStorage.setItem('loggedUser', JSON.stringify(user));
};

export const login = (data) => {
  if (!data.email) {
    throw new Error('Empty email!');
  }
  if (!data.password) {
    throw new Error('Empty password!');
  }

  const registeredUsers = getUsers();

  const loggedUser = registeredUsers.find(
    (user) => user.email === data.email && user.password === data.password
  );

  console.log('logged', loggedUser);
  if (loggedUser) {
    console.log('logged user');
    setLoggedUser(loggedUser);
  } else {
    throw new Error('Invalid login credentials!');
  }

  return true;
};

export const isLoggedUserAdmin = () => {
  const loggedUser = getLoggedUser();

  return loggedUser && loggedUser.isAdmin;
};
