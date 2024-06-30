// components/DatesCard.tsx

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
import { useNavigation } from "@react-navigation/native";
import GroupChat from "../app/chat/groupchat";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Link, router, useRouter } from "expo-router";

export interface DatesCardProps {
  fullName: string;
  about: string;
  profileImage: string;
  uid: string;
}

const DatesCard: React.FC<DatesCardProps> = ({
  fullName,
  about,
  profileImage,
  uid,
}) => {
  
  //const navigation = useNavigation();
  
  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback>
        <View>
          <Image
            source={{ uri: profileImage }}
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
      <Text>This group's ID : ${uid}</Text>
      <Link href={`/chat/groupchat?id=${uid}`} asChild>
        <TouchableOpacity>
          <FontAwesome name="thumbs-up" size={35} />
        </TouchableOpacity>
        </Link>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    backgroundColor: "#ffffff"
  },
  image: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.8,
    borderRadius: 24,
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
    top: hp(1),
    right: 10,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    //borderWidth: 1,
  },
});

export default DatesCard;
