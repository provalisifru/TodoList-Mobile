import axios from 'axios';

const url = 'http://192.168.0.103:7202/';

const logIn = async (username, password) => {
  try {
    const response = await axios.post(`${url}api/Users/login`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const getTasks = async token => {
  try {
    const response = await axios.get(`${url}api/Tasks/userTasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const updateTasks = async (taskIds, updatedTaskDataArray, token) => {
  try {
    const tasksToUpdate = taskIds.map((taskId, index) => ({
      taskId,
      isCompleted: updatedTaskDataArray[index].isCompleted,
    }));

    const response = await axios.patch(
      `${url}api/Tasks/userTasks`,
      tasksToUpdate,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const deleteTasks = async (deletedTasksId, token) => {
  try {
    const response = await axios.delete(`${url}api/Tasks/userTasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: deletedTasksId,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const deleteAllTasks = async token => {
  try {
    const response = await axios.delete(`${url}api/Tasks/deleteAllTasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const addTask = async (task, token) => {
  try {
    const response = await axios.post(`${url}api/Tasks/userTasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export default {
  logIn,
  getTasks,
  updateTasks,
  deleteTasks,
  deleteAllTasks,
  addTask,
};
