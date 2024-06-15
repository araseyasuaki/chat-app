import { Redirect, router, Link } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from '../../components/Button'

const Creater = (): JSX.Element => {
  return (
    <View style = {styles.container}>
        <Text style = {styles.createrTitle}>
            グループ設定
        </Text>
        <Link href='/memo/groupchat' asChild>
        <TouchableOpacity>
          <Text style = {styles.action}>Action</Text>
        </TouchableOpacity>
        </Link>
    </View>
  )
}





const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff'
  },
  createrTitle: {
    fontSize: 40
  },
  action: {}
})



export default Creater