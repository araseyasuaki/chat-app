import React, {useState} from "react"
import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Listings from "@/src/components/Listings";
import listingData from '../../data/destinations.json'
import { profile} from "../../../assets/images"
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import Carousel, {Pagination} from "react-native-snap-carousel";
import DatesCard from "../../components/DatesCard";
import { date } from "../../constants/date";
import ReactSimplyCarousel from 'react-simply-carousel';

const {width, height} = Dimensions.get("window")


const User = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Carousel
            data={date}
            renderItem={({ item }) => <DatesCard item={item} /> }
            firstItem={1}
            inactiveSlideScale={0.86}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={width*0.8}
            slideStyle={{ display: "flex", alignItems: "center"}}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: '#ffffff'
  },
  imageitem: {
    width: hp(4.5),
    height: hp(4.5),
    resizeMode: "cover"
  }
})

export default User

