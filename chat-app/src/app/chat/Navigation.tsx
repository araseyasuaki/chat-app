import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../users/user';
import GroupChat from './groupchat';
import GroupList from './grouplist';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
        <Stack.Screen name="GroupList" component={GroupList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;