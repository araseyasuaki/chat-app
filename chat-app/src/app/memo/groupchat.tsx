import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const Chat = (): JSX.Element => {
  return (
    <View>
        <Text>
          GroupChat page
        </Text>
    </View>
  )
}

export default Chat