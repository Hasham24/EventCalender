import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateEvent, EditEvent } from '../screens';
import BottomTab from './bottom_tab'
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'BottomTab'} component={BottomTab} />
        <Stack.Screen name={'CreateEvent'} component={CreateEvent} />
        <Stack.Screen name={'EditEvent'} component={EditEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
export { default as ScreenNames } from './routes';
