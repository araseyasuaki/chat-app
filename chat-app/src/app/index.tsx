import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { auth } from '../config'
import { View, Text } from 'react-native'

const Index = (): JSX.Element => {
  useEffect(() =>{
    onAuthStateChanged(auth, (user) => {
      if (user !== null){
        router.replace('/auth/log_in')
        //router.replace('creaters/group_list')
      }
    })
  })

  return (
    
    <Redirect href='auth/log_in' />
    //<Redirect href='users/user' />
  )
}

export default Index
