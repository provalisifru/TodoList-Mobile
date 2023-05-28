/// <reference types="nativewind/types" />

import {SafeAreaView} from 'react-native';
import {AppContextProvider} from './context/AppContext';

import React from 'react';
import LoginNavigator from './src/navigator/Navigator';
export const App = () => {
  return (
    <AppContextProvider>
      <SafeAreaView className="h-full w-full">
        <LoginNavigator />
      </SafeAreaView>
    </AppContextProvider>
  );
};

export default App;
