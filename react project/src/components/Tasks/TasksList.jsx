import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getTasks,
  getTasksForUser,
  deleteTaskById,
} from '../../managers/TasksManager';
import { getLoggedUser } from '../../managers/UsersManager';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import '../../index.css';

const TasksList = (props) => {
  const { id } = props;
  const loggedUser = getLoggedUser();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (id) {
      setTasks(getTasksForUser(id));
    } else {
      setTasks(getTasks());
    }
  }, [id]);

  const deleteTask = (taskId) => {
    deleteTaskById(taskId);
    setTasks(getTasks());
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                  </TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.rate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.author.username}</TableCell>

                  {(loggedUser.isAdmin || loggedUser.id === task.authorId) && (
                    <TableCell>
                      <Link to={`/tasks/edit/${task.id}`} className="link">
                        <Button variant="contained">Edit</Button>
                      </Link>
                    </TableCell>
                  )}
                  {(loggedUser.isAdmin || loggedUser.id === task.authorId) && (
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteTask(task.id)}
                        color="secondary"
                      >
                        <span>Delete</span>
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

export default TasksList;
