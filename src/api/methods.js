import axios from 'axios';

const url = 'http://10.37.10.174:7202/';

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
      updatedTaskData: updatedTaskDataArray[index],
    }));

    const response = await axios.put('/api/Tasks/userTasks', tasksToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default {logIn, getTasks, updateTasks};
