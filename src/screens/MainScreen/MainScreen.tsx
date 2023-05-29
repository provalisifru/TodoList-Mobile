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

  useEffect(() => {
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
    getTasks();
  }, []);

  const closePopUp = () => {
    setModalVisible(false);
  };
  const command = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate('Login');
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
        Welcome back, USER!
      </Text>
      <View className="bg-backgroundTwo m-6 flex flex-1">
        <View className="flex flex-row items-center justify-between m-3">
          <Text className="text-textColor text-[20px] font-bold underline underline-offset-8">
            Today's tasks
          </Text>
          <TouchableOpacity>
            <Text className="text-textColorTwo font-bold text-[20px]">
              Delete all
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {userTasks.map((task, id) => {
            return task.isFinished ? (
              <View
                key={id}
                className="flex flex-row justify-between items-center">
                <Text
                  className="mx-5 my-2 text-[20px] text-taskFinished line-through"
                  key={id}>
                  {task.taskName}
                </Text>
                <View className="flex flex-row items-center justify-end">
                  <TouchableOpacity className="h-[26px] w-[26px] bg-white flex items-center mr-6">
                    <Text className="text-textColorTwo text-[26px] font-bold">
                      {task.isFinished ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="h-[32px] w-[32px]flex items-center mb-1 mr-4">
                    <Text className="text-[#840B0B] text-[32px]">X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                key={id}
                className="flex flex-row justify-between items-center">
                <Text className="mx-5 my-2 text-[20px] text-textColor" key={id}>
                  {task.taskName}
                </Text>
                <View className="flex flex-row items-center justify-end">
                  <TouchableOpacity className="h-[26px] w-[26px] bg-white flex items-center mr-6">
                    <Text className="text-textColorTwo text-[26px] font-bold">
                      {task.isFinished ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="h-[32px] w-[32px]flex items-center mb-1 mr-4">
                    <Text className="text-[#840B0B] text-[32px]">X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View className="absolute bottom-0 right-0 m-6">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-white w-[64px] h-[64px] pb-1 align-middle rounded-full flex">
            <Text className="text-backgroundTwo text-[50px] text-center font-bold m-auto">
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
            <View className="absolute bottom-[20px] h-[73%] w-[90%] left-[20px]">
              <TaskAddPopup command={closePopUp} />
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
