import React from 'react';
import { Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, CalenderView } from '../../screens';
import styles from './styles';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if (route.name == 'Home') {
                        return (
                            <Text style={ focused ?styles.active:styles.inActive}>List View</Text>
                        );
                    }
                    if (route.name == 'CalenderView') {
                        return (
                            <Text style={focused ?styles.active:styles.inActive}>Calender View</Text>
                        );
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CalenderView" component={CalenderView} />
        </Tab.Navigator>
    )
}
export default BottomTab