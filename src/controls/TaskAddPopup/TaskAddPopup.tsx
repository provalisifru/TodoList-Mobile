import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const TaskAddPopup = ({command}: any) => {
  return (
    <View className="bg-backgroundTwo flex flex-1 flex-column">
      <View>
        <Text className="text-textColor font-bold text-[24px] text-center mt-3">
          Add new task:
        </Text>
        <View className="bg-white rounded-full m-6">
          <Input />
        </View>
        <Button
          textStyle="text-white text-[24px]"
          styles="bg-background mx-auto w-[120px] h-[50px] rounded-[60px]"
          text="Add task"
        />
      </View>
      <View className="absolute bottom-0 right-0 m-6">
        <TouchableOpacity
          onPress={() => command()}
          className="bg-white w-[64px] h-[64px] pb-1 align-middle rounded-full flex">
          <Text className="text-backgroundTwo text-[50px] text-center font-bold m-auto">
            -
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskAddPopup;
