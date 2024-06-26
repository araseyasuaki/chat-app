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
    fullName: ''
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



  // Fetch group chat information
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
          <MessageList messages={messages} currentUser={userData.fullName}/>
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
    flex: 1
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
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

export default GroupChat;

/*
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../config';
import LogOutButton from '@/src/components/LogOutButton';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '../../components/CustomKeyboardView';
//import { useAuth } from '../../context/authContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getRoomId } from '@/src/utils/commons';


const GroupChat = (): JSX.Element => {

  //const { user } = useAuth()

  const [userData, setUserData] = useState({
    profileImage: null,
    fullName: ''
  });

  const [groupData, setGroupData] = useState({
    profileImage: null,
    fullName: '',
    about: ''
  })

  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')

  const textRef = useRef<string>('');
  const inputRef = useRef<TextInput>(null);


  // Get group chat information
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.')
          return;
        }
        const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`)
        const docSnap = await getDoc(groupDocRef)

        if (docSnap.exists()) {
          const groupInfo = docSnap.data()
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
    }
    fetchGroupData()
  }, [])


  // Fetch current user's profile information
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) {
          console.error('User is not authenticated.');
          return;
        }

        // Assuming user profile information is stored in Firestore under a collection 'users'
        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData) {
            setGroupData({
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



  // Create a chat room in firebase DB
  useEffect(()=> {
    createRoomIfNotExists();
  }, [])

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
  

  const handleSendMessage = async() => {
    console.error("textRef.current", textRef.current)
    let message = textRef.current?.trim();
    if (!message) return(
      console.error('No message')
    );
  

    if (!auth.currentUser) {
      console.error('User is not authenticated.');
      return;
    }

    try{
      const uid = auth.currentUser.uid;
      let roomId = getRoomId(uid);
  
      // Reference to the user's document under 'groups' collection
      const userDocRef = doc(db, 'groups', uid);
  
      // Reference to the 'rooms' collection under the user's document
      const roomCollectionRef = collection(userDocRef, 'rooms');
  
      // Reference to the specific roomId document within 'rooms' collection
      const roomDocRef = doc(roomCollectionRef, roomId);
  
      // Reference to the 'messages' collection within the specific roomId document
      const messageCollectionRef = collection(roomDocRef, 'messages');
  
      // Clear text input after sending message
      if (inputRef.current) {
        inputRef.current.clear();
      }

    // Add a new document (message) to the 'messages' collection
      const newDoc = await addDoc(messageCollectionRef, {
        userId: uid,
        text: message,
        profileUrl: userData.profileImage,
        senderName: userData.fullName,
        createdAt: Timestamp.fromDate(new Date())
      })
    

      console.log('New message id:', newDoc.id);
      setNewMessage('');
      } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Message', message);
    }
  }
  

  return(
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={{ uri: groupData.profileImage || undefined }} style={styles.image} />
          <Text style={styles.title}>{groupData.fullName}</Text>
        </View>
        <View style={styles.chatBox}>
          <MessageList messages={messages} />
        </View>
        <View style={styles.option1}>
          <View style={styles.SendContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(value) => { textRef.current = value }}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
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

export default GroupChat;
*/