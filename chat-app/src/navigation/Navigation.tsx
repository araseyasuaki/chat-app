// navigation/Navigation.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatesCard, { DatesCardProps } from '../components/DatesCard'; // Import DatesCard and DatesCardProps
import GroupChatScreen from '../app/chat/groupchat'; // Import GroupChatScreen
import User from '../app/users/user';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
