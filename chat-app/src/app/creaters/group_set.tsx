import { Redirect, router, Link } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from '../../components/Button'
import { collection, addDoc } from 'firebase/firestore'
import { db, auth } from '../../config'
import { useState } from "react";
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'
import CircleButton from "@/src/components/CircleButton";
import { Feather } from "@expo/vector-icons";

const handlePress= async(bodyText: string): void => {
  if (auth.currentUser === null) { return }
  const ref = collection(db, `users/${auth.currentUser.uid}/memos`)

  await addDoc(ref, {
    bodyText
  }).catch((error) => {
    console.log(error)
  })
  router.push('/creaters/group_list')
}

const GroupSet = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('')
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
         multiline
         style={styles.input}
         value={bodyText} 
         onChangeText={(text) => { setBodyText(text) }}
         autoFocus
         />
      </View>
      <CircleButton onPress = {() => handlePress(bodyText)}>
          <Feather name='check' size={40} color='#ffffff' />
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1
  },
  input: {
    flex:1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  },
  actionContainer: {
    position: 'absolute',
    top: 480,
  },
  action: {
  }
})



export default GroupSet