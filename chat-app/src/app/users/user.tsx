
import { FlatList, View, Text, Dimensions, 
  TouchableOpacity, Image, StyleSheet, InteractionManagerStatic } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import DatesCard from "../../components/DatesCard";
//import { date} from "../../constants/date";
import { date } from "../../constants/index"
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  BellIcon,
} from "react-native-heroicons/outline";
import { user1 } from "../../../assets/images";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");
//const carouselItem = require('../../constants/date.js');
import { StatusBar } from "expo-status-bar";


const User = (): JSX.Element => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hi!</Text>
      </View>
      <View >
        <Carousel
          data={date}
          renderItem={({ item }) => <DatesCard item={item} />}
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

