import React from 'react';
import {Text, View} from 'react-native';
import Input from '../../components/Input/Input';

const LoginBox = () => {
  return (
    <View>
      <Text className="text-textColorTwo">
        Plan your day, check what is done and see what’s left to do today!
      </Text>
      <Text className="text-textColor">Login</Text>
      <Input />
    </View>
  );
};

export default LoginBox;
