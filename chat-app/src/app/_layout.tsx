import { Stack } from 'expo-router'
import { ImageBackgroundComponent } from 'react-native'

const Layout = (): JSX.Element => {
    return <Stack screenOptions ={{
        headerStyle: {
            backgroundColor: '#467FD3'
        },
        headerTintColor: '#ffffff',
        headerTitle: 'Chat App',
        headerBackTitle: 'Back',
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold'
        }
    }}/>
}

export default Layout