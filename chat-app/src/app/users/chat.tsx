// users/profile.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupList from '../chat/grouplist';

const Tab = createBottomTabNavigator();

const Chat = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Tab.Navigator>
                <Tab.Screen name="Groupu List" 
                    component={GroupList}
                    options={{ 
                        headerShown: false, 
                        title: 'Groupu List',  
                        headerLeft: () => null,
                        tabBarStyle: {
                            display: 'none'
                        }
                    }} 
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default Chat;
