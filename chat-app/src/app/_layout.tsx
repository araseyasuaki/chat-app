import { View, Text } from 'react-native'
import { ImageBackgroundComponent } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions ={{
                headerStyle: {
                    backgroundColor: '#467FD3'
                },
                headerTintColor: '#ffffff',
                headerTitle: 'Chat App!',
                //headerBackTitle: 'Back',
                headerBackTitleVisible: false,
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold'
                }
            }}/>
        </GestureHandlerRootView>
    )
}

export default Layout