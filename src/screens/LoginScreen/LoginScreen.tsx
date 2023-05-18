import React from 'react';
import {Text, View} from 'react-native';
import LoginBox from '../../controls/LoginBox/LoginBox';

const LoginScreen = () => {
  return (
    <View className="bg-background h-full w-full">
      <View>
        <Text className="text-textColor text-[40px] text-center font-bold m-6">
          Welcome{'\n'}to{'\n'}Todo List
        </Text>
      </View>
      <LoginBox />
    </View>
  );
};

export default LoginScreen;
