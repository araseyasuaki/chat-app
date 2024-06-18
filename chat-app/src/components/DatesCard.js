import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import React from "react";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { router, Link } from "expo-router";


const handlePress = (): void => {
  router.push('chat/groupchat')
}

var { width, height } = Dimensions.get("window");

export default function DatesCard({ item, handleClick }) {
  return (

    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={item.imgUrl}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>
            {item.name}
          </Text>
        </View>
        <View>
          <Text style={styles.orgText}>{item.organization}</Text>
          <Text style={styles.orgText}>{item.major}</Text>
        </View>
      </View>
      <View style={styles.thumbsup}>
      <TouchableOpacity onPress={handlePress}>
          <FontAwesome name = "thumbs-up" size = {35}/>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    backgroundColor: 'lightgrey'
  },
  image: {
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: 24,  // Applying the border radius directly
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    width: '100%',
    paddingLeft: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  orgText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  thumbsup: {
    position: 'absolute',
    top: 370,
    right: 50,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
  }
});
