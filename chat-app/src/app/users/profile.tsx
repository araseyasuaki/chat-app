import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View } from "react-native";

const Profile = (): JSX.Element => {
  return (
    <View>
        <Text>
          my profile
        </Text>
    </View>
  )
}

export default Profile