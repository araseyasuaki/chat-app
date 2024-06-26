import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config';
import LogOutButton from '@/src/components/LogOutButton'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import MessageList from '../../components/MessageList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView'

const GroupChat = (): JSX.Element => {

  const [message, setMessages] = useState([]);


  const [groupData, setGroupData] = useState({
      profileImage: null,
      fullName: '',
      about: ''
  });

  useEffect(() => {
    const fetchGroupData = async () => {
        try {
            if (!auth.currentUser) {
                console.error('User is not authenticated.');
                return;
            }
            const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`);
            const docSnap = await getDoc(groupDocRef);

            if (docSnap.exists()) {
                const groupInfo = docSnap.data();
                if (groupInfo) {
                    setGroupData({
                        profileImage: groupInfo.profileImage || '',
                        fullName: groupInfo.fullName || '',
                        about: groupInfo.about || ''
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching group data:', error);
        }
    };

      fetchGroupData();
  }, []);

  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: groupData.profileImage }} style={styles.image} />
          <Text style={styles.title}>{groupData.fullName}</Text>
        </View>
        <View style={styles.chatBox}>
          <MessageList/>
        </View>
        <View style={styles.option1}>
          <View style={styles.SendContainer}>
            <TextInput style={styles.messageInput} placeholder='Type message...'/>
            <TouchableOpacity style={styles.sendBtn}>
              <Feather name="send" size={hp(2.7)} color="#737373"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </CustomKeyboardView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 75, // half of width and height for a circular image
    marginBottom: 10,
  },
  title: {
      fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatBox:{
    flex:1,
    justifyContent: 'space-between'
  },
  option1:{
    marginBottom: hp(2.7)
  },
  SendContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 2,
    borderRadius: 20
  },
  messageInput: {
    fontSize: hp(2),
    flex: 1,
    marginRight: 2
  },
  sendBtn:{
    backgroundColor: '#F3F4F6',
    padding: 8,
    marginRight: 1,
    borderRadius: 50

  }
});

export default GroupChat
