import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector,useDispatch } from 'react-redux'
import { ScreenWrapper } from 'react-native-screen-wrapper';
import { width } from 'react-native-dimension';
import { DropDown, Header } from '../../components';
import { selectEvents, filterEvent } from '../../store/slices/events/slice';
import { EventList } from '../../components/lists';
import { filterTypes } from '../../utils/dropdowdata';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../utils/colors';
import styles from './styles';
const Home = ({ navigation }: NativeStackScreenProps<any>) => {
    const dispatch = useDispatch()
    const events = useSelector(selectEvents)
    const [eventType, setEventType] = useState('')
    const _renderEvents = ({ item }) => {
        return (
            <EventList item={item}
                onPressEdit={() => navigation.navigate('EditEvent', { event: item })}
            />
        )
    }
    const _filterEvent = (type) => {
        setEventType(type)
        dispatch(filterEvent({eventType:type}))
    }
    return (
        <ScreenWrapper statusBarColor={colors.white}>
            <Header title='My Event Listing' isBack={false} />
            <View style={styles.container}>
                <FlatList
                    data={events}
                    showsVerticalScrollIndicator={false}
                    renderItem={_renderEvents}
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={(_, index: number) => String(index)}
                    ListEmptyComponent={() => <Text style={styles.emptyComponent}>No event Listed</Text>}
                    ListHeaderComponent={ <DropDown options={filterTypes} placeholder='Event Type Filter'
                        value={eventType} setSelectedValue={_filterEvent} wrapedContainerStyle={styles.dropDown}
                    /> }
                />
                <TouchableOpacity style={styles.addButton}
                    onPress={() => navigation.navigate('CreateEvent')}
                >
                    <Entypo name='plus' size={width(6)} color={colors.white} />
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};
export default Home;
