// users/profile.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileSetting  from '../setting/profile'; // Import the profile setting component

const Tab = createBottomTabNavigator();

const UserProfile = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Tab.Navigator>
                <Tab.Screen name="Profile" 
                    component={ProfileSetting}
                    options={{ 
                        headerShown: false, 
                        title: '',  
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

export default UserProfile;
