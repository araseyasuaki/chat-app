import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config'

//import Header from '../../components/Header'

const handlePress =(email: string, password: string) : void => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.id)
        router.replace('memo/list')
    })

}

const LogIn = (): JSX.Element => {
    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>LogIn</Text>
                    <TextInput 
                    style={styles.input} 
                    value ={email}
                    onChangeText={(text) => { setEmail(text) }}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                    />
                    <TextInput 
                    style={styles.input} 
                    value ={password}
                    onChangeText={(text) => { setPassword(text) }}
                    autoCapitalize='none'
                    secureTextEntry
                    placeholder='password'
                    textContentType='password'
                    />
          <Button label='Submit' onPress={(email, password) => {handlePress}}/>
            <View style={styles.footer}>
                <Text style={styles.footerText} >Not registered?</Text>
                <Link href='/auth/sign_up' asChild>
                    <TouchableOpacity>
                    <Text style={styles.footerLink} >Sign up here!</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8'
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#ffffff',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: 'row'
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000'
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#467fD3'
    }
})

export default LogIn