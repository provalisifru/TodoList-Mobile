/// <reference types="nativewind/types" />

import {SafeAreaView} from 'react-native';

import React from 'react';
import LoginNavigator from './src/navigator/Navigator';
export const App = () => {
  return (
    <SafeAreaView>
      <LoginNavigator />
    </SafeAreaView>
  );
};

export default App;
