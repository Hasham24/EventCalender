import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useSelector, useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { selectEvents, editEvent } from '../../store/slices/events/slice';
import { areSlotsConflicting, isIntervalValid, _showMessage } from '../../utils/helper';
import { Header, InputTextField, MultiLineInputTextField, DateTimeButton, Button, DropDown } from '../../components';
import { eventTypes } from '../../utils/dropdowdata';
import { keyBoardOpen } from '../../hooks';
import colors from '../../utils/colors';
import styles from './styles';
import moment from 'moment';
type EventDetailsScreenTypes = NativeStackScreenProps<{
    "EDITEVENT": {
        event: object|any,
        isCalender: boolean
    }
}, "EDITEVENT">
const EditEvent = ({ navigation, route }: NativeStackScreenProps<any>) => {
    const { keyboardStatus } = keyBoardOpen() 
    const { event } = route?.params ?? {}
    const isCalender = route?.params?.isCalender ?? false
    const dispatch = useDispatch()
    const events = useSelector(selectEvents)
    const [name, setName] = useState(event?.name)
    const [description, setDescription] = useState(event?.description)
    const [eventType, setEventType] = useState(event?.eventType)
    const [date, setDate] = useState(event?.date)
    const [startTime, setStartTime] = useState(event?.startTime)
    const [endTime, setEndTime] = useState(event?.endTime)
    const [attachment, setAttachment] = useState(event?.attachment ?? {})
    const [documentName, setDocumentName] = useState(event?.attachment?.name ?? '')
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
        let eventDatearray = events.filter(item => moment(item?.date).format('MM/DD/YY') === moment(date).format('MM/DD/YY') && item?.id != event.id)
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
        let editEventData = {
            id: event?.id,
            eventType,
            name,
            description,
            date,
            startTime,
            endTime,
            attachment: attachment.hasOwnProperty(name) ? attachment : null
        }
        dispatch(editEvent({ event: editEventData, id: event?.id }))
        onCreateTriggerNotification()
        isCalender ? navigation.navigate('CalenderView', { isCalender }) : navigation.goBack()
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
            </View>
            { !keyboardStatus&&  <Button children={'Edit Event'} containerStyle={styles.addEventButton}
                onPress={_createEvent}
            />}
        </ScreenWrapper>
    );
};
export default EditEvent;
