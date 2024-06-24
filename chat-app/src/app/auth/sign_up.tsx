import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import Button from '../../components/Button'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { auth, db } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

const handlePress = (name: string, email: string, password: string): void => {
    console.log(name, email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential.user.uid)

        const data = {
            _id: userCredential.user.uid,
            fullName: name,
            providerData: userCredential.user.providerData[0]
        }
        setDoc(doc(db, 'users', userCredential.user.uid), data).then(()=> {
            router.replace('auth/log_in')
        })
    })
    .catch((error) => {
        const { code, message } = error
        console.log(code, message)
        Alert.alert(message)
    })
}

const SignUp = (): JSX.Element => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ name, setName ] = useState('')
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                    style={styles.input} 
                    value ={name}
                    onChangeText={(text) => { setName(text) }}
                    autoCapitalize='none'
                    placeholder='Name'
                />
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
                    placeholder = 'Password'
                    textContentType='password'
                />
                <Button label='Submit' onPress={() => {handlePress(name, email, password)}}/>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already registered?</Text>
                    <Link href='/auth/log_in' asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Log in</Text>
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

export default SignUp