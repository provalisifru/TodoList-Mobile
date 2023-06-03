import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import LoginBox from '../../controls/LoginBox/LoginBox';
import {RootStackParamList} from '../../navigator/NavigatorParams';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  return (
    <ScrollView className="bg-background flex flex-1">
      <View>
        <Text className="text-textColor text-[40px] text-center font-bold m-6">
          Welcome{'\n'}to{'\n'}Todo List
        </Text>
      </View>
      <LoginBox navigation={navigation} />
    </ScrollView>
  );
};

export default LoginScreen;
