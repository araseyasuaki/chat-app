import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { auth } from '../config'
import { View, Text } from 'react-native'

const Index = (): JSX.Element => {
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user !== null){
        //router.replace('chat/grouplist')
        router.replace('/auth/login')
        //router.replace('creaters/group_list')
      }
    })
  })

  return (
    
    <Redirect href='auth/login' />
    //<Redirect href='users/user' />
  )
}

export default Index
