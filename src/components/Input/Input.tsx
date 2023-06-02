import React from 'react';
import {TextInput} from 'react-native';

interface InputProps {
  placeholder?: string;
  styles?: string;
  value?: string;
  setState?: (str: string) => void;
  onFocus?: any;
  secureTextEntry?: boolean;
  multiline?: boolean;
}

const Input = ({
  secureTextEntry = false,
  placeholder,
  styles,
  value,
  multiline = false,
  setState = () => {},
  onFocus,
}: InputProps) => {
  return (
    <TextInput
      onChangeText={setState}
      onFocus={onFocus}
      value={value}
      multiline={multiline}
      placeholder={placeholder}
      className={`text-[24px] ${styles}`}
      placeholderTextColor={'#AAAAAA'}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
