import React, {useContext} from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {RootStackParamList} from '../../navigator/NavigatorParams';
import {StackScreenProps} from '@react-navigation/stack';
import {AppContext} from '../../../context/AppContext';
import api from '../../api/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginBox = ({navigation}: Props) => {
  const {userUsername, setUserUsername, userPassword, setUserPassword} =
    useContext(AppContext);

  const logIn = async () => {
    await api.logIn(userUsername, userPassword).then(response => {
      if (response?.status === 200) {
        AsyncStorage.setItem('token', String(response.data.token));
        setUserUsername('');
        setUserPassword('');
        navigation.navigate('Main');
      } else {
        Alert.alert(
          'Login failed',
          'Invalid username and password combination, please try again.',
          [{text: 'OK'}],
        );
      }
    });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View>
        <Text className="text-textColorThree leading-[35px] text-center mx-24 my-[24px] text-[24px]">
          Plan your day, check what is done and see what’s left to do today!
        </Text>
        <Text className="text-textColor text-[40px] text-center">Login</Text>
        <View className="m-6 mx-9 p-2 rounded-full bg-white">
          <Input
            value={userUsername}
            placeholder="Enter username..."
            setState={setUserUsername}
            styles={'text-black p-2'}
          />
        </View>
        <View className="m-6 mx-9 p-2 rounded-full bg-white">
          <Input
            secureTextEntry={true}
            placeholder="Enter password..."
            value={userPassword}
            setState={setUserPassword}
            styles={'text-black p-2'}
          />
        </View>
        <Button
          onPress={logIn}
          textStyle="text-white text-[24px]"
          styles="bg-backgroundTwo mt-[20px] mx-auto w-[120px] h-[50px] rounded-[60px]"
          text="Sign in"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginBox;
