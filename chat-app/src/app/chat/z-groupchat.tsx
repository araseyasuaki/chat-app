
import React, { useState, useEffect, useRef, cloneElement } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../config';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getRoomId } from '@/src/utils/commons';


const GroupChat = (): JSX.Element => {
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
        const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`);
        const docSnap = await getDoc(groupDocRef)

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

  // Fetch current user's profile information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }

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

  // Create a chat room in Firebase DB if it doesn't exist
  useEffect(() => {
    createRoomIfNotExists();

    if (!auth.currentUser) {return}
    const uid = auth.currentUser.uid;
    const roomId = getRoomId(uid);

    const userDocRef = doc(db, 'groups', uid);
    const roomDocRef = doc(userDocRef, 'rooms', roomId);
    const messagesRef = collection(roomDocRef, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'asc'))

    // onSnapshot : realtime updates to a query
    let unsub = onSnapshot(q, (snapshot)=>{
      let allMessages = snapshot.docs.map(doc=>{
        return doc.data();
      })
      setMessages([...allMessages]);
    })
    return unsub;


  }, []);

  const createRoomIfNotExists = async () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const roomId = getRoomId(uid);

      try {
        const userDocRef = doc(db, 'groups', uid);
        const roomDocRef = doc(userDocRef, 'rooms', roomId);

        await setDoc(roomDocRef, {
          roomId,
          createdAt: Timestamp.fromDate(new Date())
        });

        console.log("uid", uid, "roomId", roomId);
      } catch (error) {
        console.error("Error creating room:", error);
      }
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
      let roomId = getRoomId(uid);

      const userDocRef = doc(db, 'groups', uid);
      const roomCollectionRef = collection(userDocRef, 'rooms');
      const roomDocRef = doc(roomCollectionRef, roomId);
      const messageCollectionRef = collection(roomDocRef, 'messages');

      textRef.current=""
      if(inputRef) inputRef?.current?.clear()

      const newDoc = await addDoc(messageCollectionRef, {
        userId: uid,
        text: message,
        profileUrl: userData.profileImage,
        senderName: userData.fullName,
        createdAt: Timestamp.fromDate(new Date())
      });

      //console.log('New message id:', newDoc.id);
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
