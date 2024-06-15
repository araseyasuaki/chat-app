import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native'
import { signOut } from 'firebase/auth'
import { router } from 'expo-router'
import { auth } from '../config'

const HandlePress = (): void => {
    signOut(auth)
    .then(() => {
        router.replace('/auth/log_in')
    })
    .catch((error)=> {
        Alert.alert('Failed to log out')
    })
}

const LogOutButton = (): JSX.Element => {
    return (
        <TouchableOpacity>
            <Text style = {styles.text}>Log out</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: 'rgba(255,255,255,0.7)'
    }
})

export default LogOutButton