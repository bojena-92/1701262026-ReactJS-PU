import React, { useState, useEffect } from 'react';
import {
  getUsers,
  getLoggedUser,
  deleteUserById,
} from '../../managers/UsersManager';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import '../../index.css';

const UsersList = () => {
  const loggedUser = getLoggedUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const deleteUser = (userId) => {
    deleteUserById(userId);
    setUsers(getUsers());
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {loggedUser.isAdmin && (
                <TableCell colSpan={2} align="center">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              // .filter((u) => u.id !== loggedUser.id)
              .map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                    {loggedUser.isAdmin && loggedUser.id !== user.id && (
                      <TableCell>
                        <Link to={`/users/edit/${user.id}`} className="link">
                          <Button variant="contained">Edit </Button>
                        </Link>
                      </TableCell>
                    )}
                    {loggedUser.isAdmin && loggedUser.id !== user.id && (
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => deleteUser(user.id)}
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersList;
