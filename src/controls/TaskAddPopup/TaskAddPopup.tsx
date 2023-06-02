import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import api from '../../api/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskAddPopup = ({command}: any) => {
  const [taskName, setTaskName] = useState();
  const [taskCategory, setTaskCategory] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [isCompleted, setIsCompleted] = useState(false);

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

  const addTask = async () => {
    const task = {
      taskName: taskName,
      taskCategory: taskCategory,
      taskDescription: taskDescription,
      isCompleted: isCompleted ? 1 : 0,
    };
    console.log(task);
    try {
      const token = await getToken();
      await api.addTask(task, token);
    } catch (error) {
      // Handle error here
      console.error('Error while deleting tasks:', error);
    }
  };

  return (
    <View className="bg-backgroundTwo flex flex-1 flex-column">
      <View>
        <Text className="text-textColor font-bold text-[24px] text-center mt-3">
          Add new task:
        </Text>
        <View className="bg-white rounded-full m-6">
          <Input
            value={taskName}
            placeholder="Enter task name..."
            setState={setTaskName}
            styles={'text-black p-2'}
          />
        </View>
        <View className="bg-white rounded-full m-6">
          <Input
            value={taskCategory}
            placeholder="Enter task category..."
            setState={setTaskCategory}
            styles={'text-black p-2'}
          />
        </View>
        <View className="bg-white m-6">
          <Input
            value={taskDescription}
            placeholder="Enter short task description..."
            setState={setTaskDescription}
            styles={'text-black p-2 text-start'}
            multiline={true}
          />
        </View>
        <View className="mb-6">
          <Text className="text-textColor font-bold text-[24px] text-center mt-3">
            Is task completed?
          </Text>
          {isCompleted ? (
            <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)}>
              <Text className="text-textColor underline text-[20px] text-center mt-3">
                Completed
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)}>
              <Text className="text-textColor underline text-[20px] text-center mt-3">
                Not completed
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Button
          textStyle="text-white text-[24px]"
          styles="bg-background mx-auto w-[120px] h-[50px] rounded-[60px]"
          text="Add task"
          onPress={() => addTask()}
        />
      </View>
      <View className="absolute bottom-0 right-0 m-6">
        <TouchableOpacity
          onPress={() => command()}
          className="bg-white w-[64px] h-[64px] pb-1 rounded-full flex">
          <Text className="text-backgroundTwo text-[40px] font-bold m-auto">
            -
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskAddPopup;
