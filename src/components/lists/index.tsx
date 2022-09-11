import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../store/slices/events/slice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import moment from 'moment';
import colors from '../../utils/colors';
// Component Props
interface EventListProps {
  item: Object,
  onPressEdit?: () => void;
  onPresDelete?: () => void;
}
export const EventList = ({ item,onPressEdit,onPresDelete=()=>{} }: EventListProps) => {
  const dispatch = useDispatch()
  const { name, date, startTime, endTime, description, eventType, attachment,id } = item
  return (
    <View style={styles.listContainer}>
      <View style={styles.eventTitleContainer}>
        <Text>{name}</Text>
        <View style={styles.editDeleteContainer}>
          <TouchableOpacity style={styles.deleteButton}
          onPress={()=>{
            dispatch(deleteEvent({id:id}))
            onPresDelete()
        }}
          >
            <AntDesign name='delete' size={width(6)} color={colors.red} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressEdit}>
            <AntDesign name='edit' size={width(6)} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.lable}>Date : <Text style={styles.valueText}>{moment(date).format('MM/DD/YY')}</Text></Text>
      <Text style={styles.lable}>Time : <Text style={styles.valueText}>{`${moment(startTime).format('h:mm a')} - ${moment(endTime).format('h:mm a')}`}</Text></Text>
      <Text style={styles.lable}>Event Type : <Text style={styles.valueText}>{eventType}</Text></Text>
      <Text style={styles.lable}>Description : <Text style={styles.valueText}>{description}</Text></Text>
      {attachment && <Text style={styles.lable}>Attachment : <Text style={styles.valueText}>{attachment?.name}</Text></Text>}
    </View>
  );

}