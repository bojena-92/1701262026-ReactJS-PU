import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  tasksStatus,
  createTask,
  getTaskById,
} from '../../managers/TasksManager';
import { getLoggedUser } from '../../managers/UsersManager';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../index.css';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState(0);
  const [status, setStatus] = useState(tasksStatus.pending);
  const [taskCreated, setTaskCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      setTitle(task.title);
      setDescription(task.description);
      setRate(task.rate);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setRate('');
      setStatus(tasksStatus.pending);
    }
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    try {
      const result = createTask({
        id,
        title,
        description,
        rate,
        status,
        authorId: getLoggedUser().id,
      });
      if (result) {
        setTaskCreated(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Grid container>
      {taskCreated && <Redirect to="/tasks/" />}
      <Grid container item xs={12} justify="center" className="formContainer">
        <form onSubmit={handleSubmitForm} className="form">
          <Grid container item xs={12}>
            <TextField
              id="standard-basic"
              label="Title"
              onChange={handleTitleChange}
              value={title}
              className="formInputContainer"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              id="standard-basic"
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              multiline
              className="formInputContainer"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              type="number"
              id="standard-basic"
              label="Rate"
              onChange={handleRateChange}
              value={rate}
              inputProps={{
                min: '0',
              }}
              className="formInputContainer"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              id="standard-select-currency-native"
              select
              label="Status"
              value={status}
              onChange={handleStatusChange}
              SelectProps={{
                native: true,
              }}
              className="formInputContainer"
            >
              {Object.keys(tasksStatus).map((status) => {
                return (
                  <option value={tasksStatus[status]}>
                    {tasksStatus[status]}
                  </option>
                );
              })}
            </TextField>
          </Grid>
          <Grid container item xs={12} style={{ margin: '20px 0' }}>
            {errorMessage && (
              <div className="errorMessageText">{errorMessage}</div>
            )}
          </Grid>

          <Grid container item xs={12} style={{ marginTop: '10px' }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default EditTask;
