

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView } from 'react-native'
import MemoListItem from '../../components/GroupListItem'
import CircleButton from '../../components/CircleButton'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useContext, useState, useEffect } from 'react'
import LogOutButton from '@/src/components/LogOutButton'
import { Feather } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import { auth, db } from '../../config'
import { onSnapshot, doc } from 'firebase/firestore'
import { collection, addDoc, setDoc } from 'firebase/firestore'


const handlePress = (bodyText: string): void => {
    if(auth.currentUser === null) {return}    
    const ref = doc(db, `users/${auth.currentUser.uid}/about/bodyTextContext`)
    setDoc(ref, 
        {bodyText},
        {merge:true}
    )
        .then((docRef) => {
            console.log('success', docRef)
            router.push('setting/selection')
        }).catch((error)=> {
            console.log(error)
        })

}

const profileset = (): JSX.Element => {

    const navigation = useNavigation()
    useEffect(() => { 
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    },[])

    const [bodyText, setBodyText] = useState(''

    )

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View>
                <TextInput 
                multiline
                style={styles.input}
                value={bodyText}
                onChangeText={(text) => {setBodyText(text)}}
                />
            </View>

            <CircleButton onPress={() => {handlePress(bodyText)}}>
                <Feather name = 'check' size={30} color='#ffffff'/>
            </CircleButton>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        marginBottom: 16, // Space between the input and the button
        backgroundColor: '#f9f9f9',
    }


})

export default profileset
