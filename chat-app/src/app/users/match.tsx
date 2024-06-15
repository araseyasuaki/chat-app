import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const Match = (): JSX.Element => {
  return (
    <View>
        <Text>
          Match page
        </Text>
    </View>
  )
}

export default Match