import React, { useState } from 'react';
import { Text, TextProps, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import moment from 'moment';
// Component Props
interface ButtonProps {
  onPress?: () => void;
  children: string;
  containerStyle?: ViewStyle;
  touchableOpacityProps?: TouchableOpacityProps;
  textStyle?: TextStyle;
  textProps?: TextProps;
}
export const Button = ({
  onPress,
  children = 'Button',
  containerStyle = {},
  touchableOpacityProps,
  textStyle = {},
  textProps = {},
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      {...touchableOpacityProps}>
      <Text style={[styles.text, textStyle]} {...textProps}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
// DateTime Button
interface DateTimeButtonProps {
  onDatePress?: (date: string) => void;
  children: string;
  containerStyle?: ViewStyle;
  touchableOpacityProps?: TouchableOpacityProps;
  textStyle?: TextStyle;
  textProps?: TextProps;
  placeHolder?: string;
  mode?: any;
  minimumDate?:Date
}
export const DateTimeButton = ({
  children = '',
  containerStyle = {},
  touchableOpacityProps,
  textStyle = {},
  textProps = {},
  placeHolder = '',
  mode = 'date',
  minimumDate,
  onDatePress = () => { }
}: DateTimeButtonProps) => {
  const [isVisible, setIsvisible] = useState(false)
  const _onDatePres = (date) => {
    onDatePress(date)
    setIsvisible(false)
  }
  return (
    <>
      <TouchableOpacity
        style={[styles.dateButton, containerStyle]}
        onPress={() => setIsvisible(true)}
        {...touchableOpacityProps}>
        <Text style={[children == '' ? styles.unSelectedDateButtonText : styles.dateButtonText, textStyle]} {...textProps}>
          {children == '' ? placeHolder : mode == 'date' ? moment(children).format('MM/DD/YY') : moment(children).format('h:mm a')}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={(date) => _onDatePres(date)}
        onCancel={() => setIsvisible(false)}
        minimumDate={minimumDate}
        // 
      />
    </>)
}

