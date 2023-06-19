import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import api from '../../api/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';

const TaskAddPopup = ({command}: any) => {
  const [taskName, setTaskName] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datePopupVisible, setDatePopupVisible] = useState(false);
  const [isRepeatable, setIsRepeatable] = useState(false);
  const [counter, setCounter] = useState(0);

  const repetition = ['daily', 'weekly', 'monthly', 'yearly'];
  const [repetitionFrequency, setRepetitionFrequency] = useState('');

  const toggleDatePopup = () => {
    setDatePopupVisible(!datePopupVisible);
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

  const addTask = async () => {
    console.log(date);
    if (taskName === '' || taskCategory === '' || taskDescription === '') {
      Toast.show('Please fill all needed information.', 10);
      return null;
    } else {
      const task = {
        taskName: taskName,
        taskCategory: taskCategory,
        taskDescription: taskDescription,
        isCompleted: isCompleted ? 1 : 0,
        taskDate: date,
        isRepeatable: isRepeatable ? 1 : 0,
        repetitionFrequency: isRepeatable ? repetitionFrequency : '',
      };
      try {
        const token = await getToken();
        await api.addTask(task, token).then(response => {
          console.log(response);
          if (response?.status === 200) {
            Toast.show('Task added successfully!', 10);
            setTaskName('');
            setTaskCategory('');
            setTaskDescription('');
            setIsCompleted(false);
            setDate(new Date());
            setIsRepeatable(false);
          }
        });
      } catch (error) {
        Toast.show('Error while adding a task!', 10);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView className="bg-backgroundTwo flex flex-1 flex-column">
        <View className="mt-6">
          <Text className="text-textColor font-bold text-[24px] text-center mt-3">
            Add new task:
          </Text>
          <View className="bg-white rounded-full m-6">
            <Input
              value={taskName}
              placeholder="Enter task name..."
              setState={setTaskName}
              styles={'text-black p-4'}
            />
          </View>
          <View className="bg-white rounded-full m-6">
            <Input
              value={taskCategory}
              placeholder="Enter task category..."
              setState={setTaskCategory}
              styles={'text-black p-4'}
            />
          </View>
          <View className="bg-white m-6">
            <Input
              value={taskDescription}
              placeholder="Enter short task description... (Optional)"
              setState={setTaskDescription}
              styles={'text-black px-3 text-start'}
              multiline={true}
            />
          </View>
          <View className="mb-6">
            <Text className="text-textColor font-bold text-[24px] text-center mt-3">
              Is task completed?
            </Text>
            <TouchableOpacity onPress={() => setIsCompleted(!isCompleted)}>
              <Text className="text-textColor underline text-[20px] text-center mt-3">
                {isCompleted ? 'Completed' : 'Not completed'}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            textStyle="text-white text-[24px]"
            styles="bg-background mx-auto w-[160px] h-[50px] rounded-[60px]"
            text="Choose date"
            onPress={() => toggleDatePopup()}
          />
          <DatePicker
            modal
            open={datePopupVisible}
            date={date}
            onConfirm={datum => {
              toggleDatePopup();
              setDate(datum);
            }}
            onCancel={() => {
              toggleDatePopup();
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsRepeatable(!isRepeatable);
              setRepetitionFrequency(repetition[counter]);
            }}>
            <Text className="text-textColor underline text-[20px] text-center mt-3">
              {isRepeatable ? 'Repeatable' : 'Not repeatable'}
            </Text>
          </TouchableOpacity>
          {isRepeatable ? (
            <TouchableOpacity
              onPress={() => {
                if (counter === 3) {
                  setCounter(0);
                } else {
                  setCounter(counter + 1);
                }
                setRepetitionFrequency(repetition[counter]);
              }}>
              <Text className="text-textColor underline text-[20px] text-center mt-3">
                {repetitionFrequency}
              </Text>
            </TouchableOpacity>
          ) : null}
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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default TaskAddPopup;
