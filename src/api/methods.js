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

const getUsers = async id => {
  try {
    const response = await axios.get(`${url}api/Users`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default {logIn, getUsers};