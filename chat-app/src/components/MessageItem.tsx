import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


interface MessageItemProps {
  message: {
    userId: string;
    text: string;
  };
  currentUser: {
    uid: string;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({message, currentUser})=>  {

  console.log("message.userId: ", message.userId, "currentUser", currentUser.uid)
  if(currentUser?.uid === message?.userId){
    //console.log("my message")
    return (
        <View style={styles.mychatContainer}>
          <View style={styles.mychatBackground}>
            <View style={styles.mychatMsg}>
              <Text style={styles.mychatText}>
                {message?.text}
              </Text>
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <View style={styles.yourchatContainer}>
          <View style={styles.yourchatBackground}>
            <View style={styles.yourchatMsg}>
              <Text style={styles.yourchatText}>
                {message?.text}
              </Text>
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
  yourchatContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
    marginLeft: 3,
    //backgroundColor: 'yellow'
  },
  mychatBackground:{
    width: wp(80),
    //backgroundColor: 'black'
  },
  yourchatBackground:{
    width: wp(80),
    //backgroundColor: 'purple'
  },
  mychatMsg: {
    flex:1,
    alignSelf: 'flex-end',
    padding: 3,
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  yourchatMsg: {
    flex:1,
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 5,
    backgroundColor: '#EBF4FF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  mychatText:{
    fontSize: hp(2)
  },
  yourchatText:{
    fontSize: hp(2)
  },
  option2:{}
});

export default MessageItem;

