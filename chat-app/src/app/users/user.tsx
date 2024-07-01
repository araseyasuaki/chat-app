import { FlatList, View, Text, Dimensions, 
  TouchableOpacity, Image, StyleSheet, InteractionManagerStatic } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import DatesCard from "../../components/DatesCard";
import { router, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  BellIcon,
} from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
import { StatusBar } from "expo-status-bar";

import { app, auth, db } from '../../config'
import { useState, useEffect } from "react";
import { doc, getDocs, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';



const User = (): JSX.Element => {
  const router = useRouter();

  const [groups, setGroups] = useState<any[]>([]); 


  // Fetch group information
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }
        const querySnapshot = await getDocs(collection(db, 'groups'))
        const groupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          fullName: doc.data().fullName,
          about: doc.data().about,
          profileImage: doc.data().profileImage,
        }))
          
        setGroups(groupsData)
      } catch(error){
        console.error('Error fetching data: ', error)
      }
    }
    fetchGroupData();
  }, []);

  //const handlePress = (id: string) => {
  //  router.push(`/chat/groupchat/${id}`);
  //};

  return (

    <SafeAreaView style={styles.container}>
      <View >
        <Carousel
          data={groups}
          renderItem={({ item }) => (
          <DatesCard 
            fullName={item.fullName}
            about={item.about}
            profileImage={item.profileImage}
            uid = {item.id}
            />
          )}
          firstItem={1}
          inactiveSlideScale={0.86}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.8}
          slideStyle={{ display: "flex", alignItems: "center" }}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: '#ffffff'
  },
  imageItem: {
    width,
    height: 250,
    resizeMode: 'cover',
    marginVertical: 20
  },

  footer:{},
  footerText: {}
})

export default User

