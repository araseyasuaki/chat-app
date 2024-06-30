import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


interface MessageItemProps {
  message: {
    userId: string;
    text: string;
    profileImage: string;
    senderName: string;
  };
  currentUser: {
    uid: string;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({message, currentUser})=>  {

  console.log("message.userId: ", message.userId, "image:", message.profileImage)
  if(currentUser?.uid === message?.userId){
    console.log("my profile", message.profileImage)
    return (
        <View style={styles.mychatContainer}>
          <View style={styles.mychatBackground}>
            <View style={styles.mychatMsg}>
                <Text>{message?.text}</Text>
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <View style={styles.yourchatContainer}>
          <View style={styles.yourchatBackground}>
          <Image source={{uri:message.profileImage}} style={styles.userImage}/>
            <View style={styles.yourchatMsg}>
              <Text style={styles.senderName}>{message.senderName}</Text>
              <Text style={styles.yourchatText}> {message?.text} </Text>
            </View>
          </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({
  mychatContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
    marginRight: 3,
    //backgroundColor: 'red'
  },
  mychatBackground:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'center',
    width: wp(80),
    //backgroundColor: 'black'
  },
  mychatMsg: {
    alignItems: 'flex-end',
    flex:1,
    padding: 3,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    //maxWidth: '80%'
  },
  mychatText:{
    //justifyContent: 'center',
    //textAlign : 'center',
    alignSelf: 'flex-end',
    fontSize: hp(2)
  },
  yourchatContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 3,
    marginLeft: 3,
    //backgroundColor: 'yellow'
  },
  yourchatBackground:{
    flexDirection: 'row',
    width: wp(80),
    //backgroundColor: 'purple'
  },
  userImage:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 8
  },
  yourchatMsg: {
    flex:1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#EBF4FF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  senderName:{
    fontWeight: '800'
  },
  yourchatText:{
    fontSize: hp(2)
  },
  option2:{}
});

export default MessageItem;

