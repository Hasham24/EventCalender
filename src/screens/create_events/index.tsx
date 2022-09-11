import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import { useSelector, useDispatch } from 'react-redux'
import DocumentPicker from 'react-native-document-picker'
import { addEvent, selectEvents } from '../../store/slices/events/slice';
import { areSlotsConflicting, isIntervalValid, _showMessage } from '../../utils/helper';
import { Header, InputTextField, MultiLineInputTextField, DateTimeButton, Button, DropDown } from '../../components';
import colors from '../../utils/colors';
import styles from './styles';
import { eventTypes } from '../../utils/dropdowdata';
import moment from 'moment';

const CreateEvent = ({ navigation }: NativeStackScreenProps<any>) => {
    const dispatch = useDispatch()
    const events = useSelector(selectEvents)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [eventType, setEventType] = useState('')
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [attachment, setAttachment] = useState({})
    const [documentName, setDocumentName] = useState('')
    const _createEvent = () => {
        if (name == '') {
            return _showMessage('Please enter event name')
        }
        if (description == '') {
            return _showMessage('Please enter description')
        }
        if (eventType == '') {
            return _showMessage('Please select event type')
        }
        if (date == '') {
            return _showMessage('Please select date')
        }
        if (startTime == '') {
            return _showMessage('Please select start time')
        }
        if (endTime == '') {
            return _showMessage('Please select end time')
        }
        if (!isIntervalValid(startTime, endTime)) {
            return _showMessage('End Time cannot be before Start Time')
        }
        let timeSlot = {
            startTime: startTime,
            endTime: endTime
        }
        let isConflicting = false
        let eventDatearray = events.filter(item => moment(item?.date).format('MM/DD/YY') === moment(date).format('MM/DD/YY'))
        if (eventDatearray.length > 0) {
            for (let i = 0; i < eventDatearray.length; i++) {
                const currentSlot = {
                    startTime: eventDatearray[i].startTime,
                    endTime: eventDatearray[i]?.endTime
                }
                if (areSlotsConflicting(timeSlot, currentSlot)) {
                    isConflicting = true
                    break;
                }
            }
        }
        if (isConflicting) {
            return _showMessage('Time slot conflicting')
        }
        let event = {
            id: events.length,
            eventType,
            name,
            description,
            date,
            startTime,
            endTime,
            attachment: attachment.hasOwnProperty(name) ? attachment : null
        }
        dispatch(addEvent({ event }))
        navigation.goBack()
    }
    const _attachDocument = async () => {
        try {
            const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
                type: [DocumentPicker.types.pdf],
            })
            setAttachment(pickerResult)
            setDocumentName(pickerResult?.name)
        } catch (e) {
            console.log(e);

        }
    }
    return (
        <ScreenWrapper statusBarColor={colors.white}>
            <Header title='Create Event' onPress={navigation.goBack} />
            <View style={styles.container}>
                <InputTextField value={name} placeHolder='Enter Name' onChangeText={setName} />
                <MultiLineInputTextField value={description} placeHolder='Enter Description' onChangeText={setDescription} />
                <DropDown options={eventTypes} placeholder='select event type'
                    value={eventType} setSelectedValue={setEventType}
                />
                <DateTimeButton children={date} placeHolder='Select Date'
                    onDatePress={setDate} minimumDate={new Date(moment().add(1, 'day').valueOf() - 86400000)}
                />
                <View style={styles.timeContainer}>
                    <DateTimeButton children={startTime} placeHolder='Start Time' containerStyle={styles.timeButton}
                        mode='time' onDatePress={setStartTime}
                    />
                    <DateTimeButton children={endTime} placeHolder='End Time' containerStyle={styles.timeButton}
                        mode='time' onDatePress={setEndTime}
                    />
                </View>
                <Button children={documentName == '' ? 'Attachment (optional)' : documentName} containerStyle={styles.attachmentButton}
                    textStyle={documentName == '' ? styles.unSelectattachmentText : styles.attachmentText}
                    onPress={_attachDocument}
                />
                <Button children={'Add Event'} containerStyle={styles.addEventButton}
                onPress={_createEvent}
            />
            </View>
        </ScreenWrapper>
    );
};
export default CreateEvent;
