import React, { useState, useLayoutEffect } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenWrapper } from 'react-native-screen-wrapper';
import { useSelector } from 'react-redux'
import { EventList } from '../../components/lists';
import { width } from 'react-native-dimension';
import { Header } from '../../components';
import { selectCopyEvents } from '../../store/slices/events/slice';
import CalendarPicker from 'react-native-calendar-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import colors from '../../utils/colors';
import styles from './styles';
const EventCalender = ({ navigation, route }: NativeStackScreenProps<any>) => {
    const events = useSelector(selectCopyEvents)
    const [date, setDate] = useState('')
    const [eventList, setEventList] = useState<any[]>([])

    const _filterEventData = (date: moment.MomentInput) => {
        let filterEvent = events.filter(item => moment(item?.date).format('MM/DD/YY') == moment(date).format('MM/DD/YY'))
        setEventList(filterEvent)

    }
    const _deleteEventData = (id:number) => {
        let newEvent = [...eventList]
        let index = events.findIndex(item => item?.id == id)
        if (index > -1) {
            newEvent.splice(index, 1)
        }
        setEventList(newEvent)

    }
    useLayoutEffect(() => {
        _filterEventData(date == '' ? moment() : date)
    }, [route?.params?.isCalender])
    const _renderEvents = ({ item, index }) => {
        return (
            <EventList item={item}
                onPressEdit={() => navigation.navigate('EditEvent', { event: item, isCalender: true })}
                onPresDelete={() => _deleteEventData(item?.id)}
            />
        )
    }
    return (
        <ScreenWrapper statusBarColor={colors.white}>
            <Header title='My Event Calender' isBack={false} />
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={styles.calendarContainer}>
                        <CalendarPicker
                            startFromMonday={true}
                            initialDate={new Date()}
                            enableDateChange={true}
                            minDate={new Date()}
                            todayBackgroundColor={colors.blue}
                            selectedDayColor={colors.black}
                            selectedDayTextColor={colors.white}
                            onDateChange={(date) => {
                                setDate(date)
                                _filterEventData(date)
                            }}
                            previousComponent={<AntDesign name="caretleft" size={width(4)} color={colors.black} />}
                            nextComponent={<AntDesign name="caretright" size={width(4)} color={colors.black} />}
                            headerWrapperStyle={styles.headerWrapperStyle}
                            dayLabelsWrapper={styles.dayLabelsWrapper}
                            customDatesStyles={() => {
                                return {
                                    containerStyle: styles.dateContainerStyles,
                                };
                            }}
                            customDayHeaderStyles={() => {
                                return {
                                    textStyle: styles.weekText,
                                };
                            }}
                            monthTitleStyle={styles.headerText}
                            yearTitleStyle={styles.headerText}
                            weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                            width={width(90)}
                        />
                    </View>
                    {eventList.length > 0 ?
                        <>
                            {eventList.map((item, index) => {
                                const { id } = item
                                return (
                                    <EventList item={item} key={String(index)}
                                        onPressEdit={() => navigation.navigate('EditEvent', { event: item, isCalender: true })}
                                        onPresDelete={() => _deleteEventData(id)}
                                    />
                                )
                            })}
                        </> :
                        <Text style={styles.emptyComponent}>No event Listed</Text>
                    }

                    {/* <FlatList
                        data={eventList}
                        showsVerticalScrollIndicator={false}
                        renderItem={_renderEvents}
                        contentContainerStyle={styles.contentContainer}
                        keyExtractor={(_, index: number) => String(index)}
                        ListEmptyComponent={() => <Text style={styles.emptyComponent}>No event Listed</Text>}
                    /> */}
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};
export default EventCalender;
