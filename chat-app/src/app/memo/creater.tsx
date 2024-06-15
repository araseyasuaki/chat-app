import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const User = (): JSX.Element => {
  return (
    <View>
        <Text>
            Creater page
        </Text>
    </View>
  )
}

export default User