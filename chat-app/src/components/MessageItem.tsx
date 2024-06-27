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
        <View style={styles.chatContainer}>
          <View style={styles.chatBackground}>
            <View style={styles.chatMsg}>
              <Text style={styles.chatText}>
                {message?.text}
              </Text>
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <View style={styles.chatContainer}>
          <View style={styles.chatBackground}>
            <Text style={styles.option2}>
              {message?.text}
              </Text>
          </View>
        </View>
    )
    }
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 3,
    marginRight: 3
  },
  chatBackground:{
    width: wp(80),
  },
  chatMsg: {
    flex:1,
    alignSelf: 'flex-end',
    padding: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  chatText:{
    fontSize: hp(2)
  },
  option2:{}
});

export default MessageItem;

//https://www.youtube.com/watch?v=OgNiNiaedVs&list=PLKWMD009Q4qRvrfjGotVfUbqGoLdvRDN4&index=8