import React, { useRef } from 'react';
import { Text, TouchableHighlight, View,ViewStyle } from 'react-native';
import { width } from 'react-native-dimension';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import styles from './styles';
interface DropDownProps {
    onPress?: () => void;
    options?:object;
    value?:string;
    placeholder?:string
    wrapedContainerStyle?: ViewStyle;
    dropDownStyles?: ViewStyle;
    setSelectedValue:(text: string) => void
  }
export const DropDown = ({ options = [], value='', placeholder = '', wrapedContainerStyle = {}, dropDownStyles = {}, setSelectedValue }:DropDownProps) => {
    const dropDownRef = useRef<any>(null)
    return (
        <ModalDropdown
            options={options}
            dropdownStyle={[styles.dropDown, dropDownStyles]}
            showsVerticalScrollIndicator={false}
            onSelect={(_, value:string) => {
                setSelectedValue(value)
            }}
            ref={dropDownRef}
            renderRow={(option) => {
                return (
                    <TouchableHighlight underlayColor={'transparent'} style={styles.dropDownItemContainer}
                        onPress={() => {
                            setSelectedValue(option)
                           dropDownRef.current.hide();
                        }}>
                        <Text style={styles.dropDownItemText}>{option}</Text>
                    </TouchableHighlight>
                )
            }}
        >
            <View style={[styles.container, wrapedContainerStyle]}>
            <Text style={value!=''?styles.selectedValueText: styles.placeHoladerText}>{value!=''?value: placeholder}</Text>
                <FontAwesome name='caret-down' size={width(5)} color={colors.black} /> 
            </View>
        </ModalDropdown>
    );
}