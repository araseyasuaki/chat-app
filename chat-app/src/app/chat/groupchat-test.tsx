
import React, { useState, useEffect, useRef, cloneElement } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getRoomId } from '@/src/utils/commons';
import { useLocalSearchParams } from 'expo-router';



const GroupChat = (): JSX.Element => {
  const { id } = useLocalSearchParams(); // Retrieve the passed ID
  console.log("group's userid: ", id) // why shown 5 times?

  const [userData, setUserData] = useState({
    profileImage: null,
    fullName: '',
    about: ''
  });

  const [groupData, setGroupData] = useState({
    profileImage: null,
    fullName: '',
    about: ''
  });

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);

  // Fetch group information
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }
        const groupDocRef = doc(db, `groups/${id}`);
        const docSnap = await getDoc(groupDocRef)
        console.log('ID of this chat:', id)

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
  }, [id]);

  // Fetch current user's profile information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }

        console.log('Fetching my id? ', auth.currentUser.uid)
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            setUserData({
              profileImage: userData.profileImage || null,
              fullName: userData.fullName || '',
              about: userData.about || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  /***/

// Subscribe to message updates
useEffect(() => {
  const unsubscribe = subscribeToMessages();

  return () => unsubscribe();
}, [id]);

const subscribeToMessages = () => {
  try {
    const userDocRef = doc(db, 'groups', id);
    const roomCollectionRef = collection(userDocRef, 'rooms');
    const roomDocRef = doc(roomCollectionRef, getRoomId(id));
    const messageCollectionRef = collection(roomDocRef, 'messages');

    return onSnapshot(query(messageCollectionRef, orderBy('createdAt', 'asc')), (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(fetchedMessages);
    });
  } catch (error) {
    console.error('Error subscribing to messages:', error);
  }
};


  const handleSendMessage = async () => {

    let message = newMessage.trim();
    if (!message) {
      console.error('No message');
      return;
    }

    try {
      if (!auth.currentUser) {
        console.error('User is not authenticated.');
        return;
      }

      const uid = auth.currentUser.uid;
      let roomId = getRoomId(id);

      const userDocRef = doc(db, 'groups', id);
      const roomCollectionRef = collection(userDocRef, 'rooms');
      const roomDocRef = doc(roomCollectionRef, roomId);
      const messageCollectionRef = collection(roomDocRef, 'messages');

      console.log("handleSendmessage, uid: ", uid , "id", id, "roomId", roomId, "messages", messages)

      textRef.current=""
      if(inputRef) inputRef?.current?.clear()

      const newDoc = await addDoc(messageCollectionRef, {
        userId: uid,
        text: message,
        profileUrl: userData.profileImage,
        senderName: userData.fullName,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log('New message id:', newDoc.id);
      setNewMessage('');
      if (inputRef.current) {
        inputRef.current.clear();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Message', message);
    }
  };


  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>

        <View style={styles.headerContainer}>
          <Image source={{ uri: groupData.profileImage || undefined }} style={styles.image} />
          <Text style={styles.title}>{groupData.fullName}</Text>
        </View>


        <View style={styles.chatBox}>
          <MessageList messages={messages} currentUser={auth.currentUser}/>
        </View>


        <View style={styles.option1}>
          <View style={styles.SendContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(value) => { setNewMessage(value); }}
              style={styles.messageInput}
              placeholder="Type message..."
              value={newMessage}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Feather name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red'
  },
  headerContainer: {
    //flex: 1,
    alignItems: 'center',
    //backgroundColor: 'black',
    padding: 1,
    marginTop: 3

  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatBox: {
    flex: 1,
    justifyContent: 'space-between'
  },
  option1: {
    marginBottom: hp(2.7)
  },
  SendContainer: {
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
  sendBtn: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    marginRight: 1,
    borderRadius: 50
  }
});

export default GroupChat
