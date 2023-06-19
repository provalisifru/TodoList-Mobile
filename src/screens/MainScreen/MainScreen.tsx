import React, {useEffect, useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/Button/Button';

import {RootStackParamList} from '../../navigator/NavigatorParams';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskAddPopup from '../../controls/TaskAddPopup/TaskAddPopup';
import api from '../../api/methods';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const MainScreen = ({navigation}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [deletedTasksId, setDeletedTasksId] = useState([]);
  const [flagIsChanged, setFlagIsChanged] = useState(false);
  const getTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        let tasks = await api.getTasks(token);
        setUserTasks(tasks);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const closePopUp = () => {
    setModalVisible(false);
    getTasks();
  };
  const command = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        return token;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const changeIsCompleted = (taskId: string) => {
    setFlagIsChanged(true);
    // Find the index of the task in the array
    const taskIndex = userTasks.findIndex(task => task.taskId === taskId);

    // If the task is found in the array
    if (taskIndex !== -1) {
      // Create a new copy of the tasks array
      const updatedTasks = [...userTasks];

      // Update the 'isCompleted' property of the task
      updatedTasks[taskIndex].isCompleted =
        !updatedTasks[taskIndex].isCompleted;
      // Check if task is changed
      updatedTasks[taskIndex].isChanged = true;

      // Update the state with the modified tasks array
      setUserTasks(updatedTasks);
    }
  };

  const deleteTask = (taskId: string) => {
    setFlagIsChanged(true);
    const taskIndex = userTasks.findIndex(task => task.taskId === taskId);

    // If the task is found in the array
    if (taskIndex !== -1) {
      // Create a new copy of the tasks array
      const updatedTasks = [...userTasks];

      const deletedTasks = [...deletedTasksId];

      deletedTasks.push(taskId);

      setDeletedTasksId(deletedTasks);

      // Delete task from array of tasks
      updatedTasks.splice(taskIndex, 1);

      // Update the state with the modified tasks array
      setUserTasks(updatedTasks);
    }
  };

  const saveTasks = async () => {
    setFlagIsChanged(false);
    const updatedTasks = userTasks.filter(task => task.isChanged);

    const taskIds = updatedTasks.map(task => task.taskId);

    const updatedTaskData = updatedTasks.map(task => ({
      isCompleted: task.isCompleted ? 1 : 0,
    }));

    if (deletedTasksId.length > 0) {
      try {
        const token = await getToken();
        await api.deleteTasks(deletedTasksId, token);
        setDeletedTasksId([]);
      } catch (error) {
        // Handle error here
        console.error('Error while deleting tasks:', error);
      }
    }

    try {
      const token = await getToken();
      await api.updateTasks(taskIds, updatedTaskData, token);
    } catch (error) {
      // Handle error here
      console.error('Error while updating tasks:', error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      const token = await getToken();
      await api.deleteAllTasks(token);
      setUserTasks([]);
    } catch (error) {
      // Handle error here
      console.error('Error while deleting tasks:', error);
    }
  };

  const showDetails = (taskId: string) => {
    const taskIndex = userTasks.findIndex(task => task.taskId === taskId);
    const updatedTasks = [...userTasks];

    if (taskIndex !== -1) {
      if (updatedTasks[taskIndex].detailsShown) {
        updatedTasks[taskIndex].detailsShown =
          !updatedTasks[taskIndex].detailsShown;
      } else {
        updatedTasks[taskIndex].detailsShown = true;
      }

      setUserTasks(updatedTasks);
    }
  };

  const formatTime = time => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${day}.${month}.${year}. ${hours}:${minutes}`;
    return formattedTime;
  };

  return (
    <View className="flex bg-background flex-1">
      <View className="flex flex-row items-center justify-between mx-6">
        <View>
          <Text className="text-[32px] text-textColor font-bold">
            Todo List
          </Text>
        </View>
        <View className="mb-2">
          <Button
            onPress={command}
            textStyle="text-white text-[24px]"
            styles="bg-backgroundTwo mt-[20px] mx-auto w-[120px] h-[50px] rounded-[60px]"
            text="Sign out"
          />
        </View>
      </View>
      <Text className="text-[32px] text-textColor font-bold self-center my-6 mx-24 text-center">
        Welcome back!
      </Text>
      <View className="bg-backgroundTwo m-6 flex flex-1">
        <View className="flex flex-row items-center justify-between m-3">
          <Text className="text-textColor text-[20px] font-bold underline underline-offset-8">
            Today's tasks
          </Text>
          {userTasks.length > 0 ? (
            <TouchableOpacity onPress={() => deleteAllTasks()}>
              <Text className="text-textColorTwo font-bold text-[20px]">
                Delete all
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          {userTasks.length > 0 ? (
            userTasks.map((task, id) => {
              return (
                <View>
                  <View
                    key={id}
                    className="flex flex-row justify-between items-center">
                    <View className="flex flex-row">
                      <Text className="m-2 text-textColor inline text-[20px]">
                        {id + 1}.
                      </Text>
                      {task.isCompleted ? (
                        <TouchableOpacity
                          onPress={() => showDetails(task.taskId)}>
                          <Text
                            className="m-2 text-[20px] text-taskFinished line-through"
                            key={id}>
                            {task.taskName}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => showDetails(task.taskId)}>
                          <Text
                            className="m-2 text-[20px] text-textColor"
                            key={id}>
                            {task.taskName}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    <View className="flex flex-row items-center justify-end">
                      <TouchableOpacity
                        className="h-[26px] w-[26px] bg-white flex items-center mr-6"
                        onPress={() => changeIsCompleted(task.taskId)}>
                        <Text className="text-textColorTwo text-[20px] font-bold">
                          {task.isCompleted ? '✓' : ''}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="h-[32px] w-[32px]flex items-center mb-1 mr-4"
                        onPress={() => deleteTask(task.taskId)}>
                        <Text className="text-[#840B0B] text-[32px]">X</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {task.detailsShown ? (
                    <View key={`${id}details`}>
                      <Text className="mx-5 my-2 text-[15px] text-textColorThree">
                        {task.taskDescription}
                      </Text>
                      <Text className="mx-5 my-2 text-[15px] text-[#533669]">
                        {task.taskCategory}
                      </Text>
                      <Text className="mx-5 my-2 text-[15px] text-[#533669]">
                        {formatTime(task.taskDate)}
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            })
          ) : (
            <View className="flex self-center m-6">
              <Text className="text-textColor text-center text-[32px]">
                No tasks found. Please add new tasks!
              </Text>
            </View>
          )}
        </View>
        {flagIsChanged ? (
          <View className="absolute bottom-0 left-0 m-6">
            <Button
              onPress={saveTasks}
              textStyle="text-white text-[24px]"
              styles="bg-background mt-[20px] mx-auto w-[120px] h-[50px] rounded-[60px]"
              text="Save tasks"
            />
          </View>
        ) : null}

        <View className="absolute bottom-0 right-0 m-6">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-white w-[64px] h-[64px] pb-1 rounded-full flex">
            <Text className="text-backgroundTwo text-[40px] font-bold m-auto">
              +
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View className="absolute h-full w-full">
              <TaskAddPopup command={closePopUp} />
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
