import React from 'react';
import {Text, View} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {RootStackParamList} from '../../navigator/NavigatorParams';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginBox = ({navigation}: Props) => {
  const logIn = () => {
    navigation.navigate('Main');
  };
  return (
    <View>
      <Text className="text-textColorThree leading-[35px] text-center mx-24 my-[24px] text-[24px]">
        Plan your day, check what is done and see what’s left to do today!
      </Text>
      <Text className="text-textColor text-[40px] text-center">Login</Text>
      <View className="m-6 mx-9 p-2 rounded-full bg-white">
        <Input placeholder="Enter username..." />
      </View>
      <View className="m-6 mx-9 p-2 rounded-full bg-white">
        <Input secureTextEntry={true} placeholder="Enter password..." />
      </View>
      <Button
        onPress={logIn}
        textStyle="text-white text-[24px]"
        styles="bg-backgroundTwo mt-[20px] mx-auto w-[120px] h-[50px] rounded-[60px]"
        text="Sign in"
      />
      <Text className="text-textColorTwo text-center mt-[20px] text-[20px] font-bold">
        Continue as guest
      </Text>
    </View>
  );
};

export default LoginBox;
