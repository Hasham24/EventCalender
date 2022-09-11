import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import { useSelector, useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { addEvent, selectEvents } from '../../store/slices/events/slice';
import { areSlotsConflicting, isIntervalValid, _showMessage } from '../../utils/helper';
import { Header, InputTextField, MultiLineInputTextField, DateTimeButton, Button, DropDown } from '../../components';
import { eventTypes } from '../../utils/dropdowdata';
import colors from '../../utils/colors';
import styles from './styles';
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

    const onCreateTriggerNotification = async () => {
        const trigerdate = new Date(date);
        let hour = Number(moment(startTime).format('H'))
        let minutes = Number(moment(startTime).subtract(10, 'minutes').format('mm'))
        trigerdate.setHours(hour)
        trigerdate.setMinutes(minutes)
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: trigerdate.getTime(), // fire at 11:10am (10 minutes before meeting)
        };
        // Create a trigger notification
        try {
            await notifee.createTriggerNotification(
                {
                    id: String(events.length),
                    title: 'You have an event',
                    body: `Today at ${moment(startTime).format('hh:mma')}`,
                    android: {
                        channelId: 'your-channel-id',
                    },
                },
                trigger,
            );
        } catch (error) {
            console.log(error);

        }
    }

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
        if (!isIntervalValid(startTime, endTime)) {
            return _showMessage('End Time cannot be before Start Time')
        }
        if (moment().format('MM/DD/YY') === moment(date).format('MM/DD/YY')) {
            let currentTime = moment()
            let startEventTime = moment(startTime).subtract(30, 'minute')
            if (!isIntervalValid(currentTime, startEventTime))
                return _showMessage('Your event must be in the future atleast 30 minutes before current time')
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
            id: String(events.length),
            eventType,
            name,
            description,
            date,
            startTime,
            endTime,
            attachment: attachment.hasOwnProperty(name) ? attachment : null
        }
        dispatch(addEvent({ event }))
        onCreateTriggerNotification()
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
