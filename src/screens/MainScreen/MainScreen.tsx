import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Button from '../../components/Button/Button';

import {RootStackParamList} from '../../navigator/NavigatorParams';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const tasks = [
  {
    name: 'Walk a dog',
    isFinished: true,
  },
  {
    name: 'Wash your teeth',
    isFinished: true,
  },
  {
    name: 'Meditate',
    isFinished: false,
  },
  {
    name: 'Call your friend',
    isFinished: false,
  },
  {
    name: 'Go to gym',
    isFinished: false,
  },
];

const MainScreen = ({navigation}: Props) => {
  const command = () => {
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
      <View className="bg-backgroundTwo m-6">
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
          {tasks.map((task, id) => {
            return task.isFinished ? (
              <View className="flex flex-row justify-between items-center">
                <Text
                  className="mx-5 my-2 text-[20px] text-taskFinished line-through"
                  key={id}>
                  {task.name}
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
              <View className="flex flex-row justify-between items-center">
                <Text className="mx-5 my-2 text-[20px] text-textColor" key={id}>
                  {task.name}
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
      </View>
    </View>
  );
};

export default MainScreen;
