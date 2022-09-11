import React, { forwardRef } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import styles from './styles';
import colors from '../../utils/colors';

// Component Props
interface InputProps {
  placeHolder: string,
  onChangeText?: (text:string) => void;
  value:string
}
export const InputTextField = forwardRef(({
  placeHolder = '', onChangeText,value
}: InputProps, ref) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholder={placeHolder}
        placeholderTextColor={colors.slateGray}
        onChangeText={onChangeText}
        blurOnSubmit={false}
        autoCorrect={false}
        returnKeyType={'next'}
        value={value}
      />
    </View>
  );
});
export const MultiLineInputTextField = forwardRef(({
  placeHolder = '', onChangeText,value
}: InputProps, ref) => {
  return (
    <View style={styles.multlineInputContainer}>
      <TextInput
        style={styles.multlineInputText}
        placeholder={placeHolder}
        placeholderTextColor={colors.slateGray}
        onChangeText={onChangeText}
        blurOnSubmit={true}
        onSubmitEditing={()=>{Keyboard.dismiss()}}
        autoCorrect={false}
        returnKeyType={'done'}
        multiline={true}
        textAlignVertical='top'
        value={value}
      />
    </View>
  );
});

