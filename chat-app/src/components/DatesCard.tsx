import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface DatesCardProps {
    fullName: string
    about: string
    profileImage: string
    //handlePress: (id: string) => void;
  //handleClick: (item: any) => void;
}

const handlePress = (): void => {
  router.push("chat/groupchat"); // group list
};

const { width, height } = Dimensions.get("window");

const DatesCard: React.FC<DatesCardProps> = ({ fullName, about, profileImage }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback>
        <View>
          <Image
            source={{uri: profileImage}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{fullName}</Text>
        </View>
        <View>
          <Text style={styles.orgText}>{about}</Text>
        </View>
      </View>
      <View style={styles.thumbsup}>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome name="thumbs-up" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    backgroundColor: "lightgrey",
  },
  image: {
    width: width * 0.8,
    height: height * 0.8,
    borderRadius: 24, // Applying the border radius directly
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
    width: "100%",
    paddingLeft: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  orgText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
  thumbsup: {
    position: "absolute",
    top: 370,
    right: 50,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default DatesCard;
