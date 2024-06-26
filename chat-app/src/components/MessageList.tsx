import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const MessageList = (): JSX.Element => {
  return (
    <View>
        <Text>
          MessageList
        </Text>
    </View>
  )
}

export default MessageList