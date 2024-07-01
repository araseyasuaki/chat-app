import { Redirect, router, Link } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from '../../components/Button'
import { FlatList } from "react-native-gesture-handler";
import ChatItem from './ChatItem'
import { useState } from "react";
import { useRouter } from "expo-router";
import { auth, db } from '../../config';
import { doc, getDoc, setDoc, getDocs, collection, addDoc, onSnapshot, Timestamp, orderBy, query, where } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const GroupList = (): JSX.Element => {
    const router = useRouter();
    //const [users, setUser] = useState([1, 2, 3]); // Placeholder for users
    const [groups, setGroups] = useState<any[]>([]);
    const { id } = useLocalSearchParams(); // Retrieve the passed ID

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }

                const groupsRef = collection(db, 'groups');
                const querySnapshot = await getDocs(groupsRef);

                let groupsData: any[] = [];

                for (const doc of querySnapshot.docs) {
                    const groupData = doc.data();
                    const groupId = doc.id;

                    // Fetch rooms for the current group
                    const roomsRef = collection(db, `groups/${groupId}/rooms`);
                    const roomsSnapshot = await getDocs(roomsRef);
                    const roomsData = [];

                    for (const roomDoc of roomsSnapshot.docs) {
                        const roomData = roomDoc.data();
                        const roomId = roomDoc.id;

                        // Fetch messages for the current room
                        const messagesRef = collection(db, `groups/${groupId}/rooms/${roomId}/messages`);
                        const messagesSnapshot = await getDocs(messagesRef);
                        const roomMessages: any[] = [];

                        messagesSnapshot.forEach(messageDoc => {
                            roomMessages.push({
                                id: messageDoc.id,
                                ...messageDoc.data()
                            });
                        });

                        // Check if user ID exists in messages of the current room
                        const userParticipated = roomMessages.some(message => message.userId === auth.currentUser.uid);

                        if (userParticipated) {
                            groupsData.push({
                                id: groupId,
                                ...groupData,
                                rooms: [
                                    ...(groupData.rooms || []),
                                    {
                                        roomId,
                                        messages: roomMessages
                                    }
                                ]
                            });
                            break; // Break out of loop once found in this group
                        }
                    }
                }

                setGroups(groupsData);
                console.log('Groups where user participated:', groupsData);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupData();
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.createrTitle}></Text>
            <View>
                <FlatList
                    data={groups}
                    //keyExtractor={(item) => item.toString()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <ChatItem router={router} item={item} index={index} />
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    createrTitle: {
        fontSize: 40
    },
    action: {}
});

export default GroupList;


/*
const GroupList = (): JSX.Element => {
    const router = useRouter()
    const [users, setUser ] = useState([1,2,3])
    const [groups, setGroups] = useState<any[]>([]);
    const { id } = useLocalSearchParams(); // Retrieve the passed ID

    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                if (!auth.currentUser) {
                console.error('User is not authenticated.');
                return;
                }
                const groupsRef = collection(db, 'groups');
                const querySnapshot = await getDocs(groupsRef);

                let groupsData: any[] = [];
                console.log("-----------------")

                querySnapshot.forEach(async(doc) => {
                    const groupData = doc.data();
                    const groupId = doc.id

                    const roomsRef = collection(db, `groups/${groupId}/rooms`)
                    const roomsSnapshot = await getDocs(roomsRef)
                    const roomsData = []
                    roomsSnapshot.forEach(roomDoc => {
                        roomsData.push(roomDoc.data())
                    })

                    groupData.rooms = roomsData

                    if(groupData.rooms){
                        for (const room of groupData.rooms){
                            const roomId = room.roomId
                            console.log('room ID: ', roomId)

                            const messagesRef = collection(db, `groups/${doc.id}/rooms/${roomId}/messages`)
                            const messagesSnapshot = await getDocs(messagesRef)

                            let roomMessages: any = {}
                            messagesSnapshot.forEach((messageDoc) => {
                                roomMessages[messageDoc.id] = messageDoc.data()
                                console.log('Room Messages:', roomMessages[messageDoc.id].text, roomMessages[messageDoc.id].userId)
                            })

                        
                            if (Object.values(roomMessages).some(message => message.userId === auth.currentUser.uid)) {
                                groupNames.add(groupData.fullName); // Add group name to set
                                console.log('groupName', groupNames)
                                break; // Break out of loop once found in this group
                            }
                        }
                    } 
                    
                    else {
                        console.log('No rooms found for this group.')
                    }
                });

                setGroups(groupsData);
                console.log('Groups where user participated:', groupsData);

      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    fetchGroupData();
  }, [id]);

  return (
    <View style = {styles.container}>
        <Text style = {styles.createrTitle}>
            
        </Text>

        <View>
            <FlatList
            data = {users}
            keyExtractor={(item) => item.toString()} // Add a key extractor
            renderItem={({item, index})=> <ChatItem 
            noBorder={index+1 == users.length}
            router = {router}
            item={item}
            index={index} />}
            />
        </View>

        <Link href='/memo/groupchat' asChild>
        <TouchableOpacity>
          <Text style = {styles.action}>Action</Text>
        </TouchableOpacity>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff'
  },
  createrTitle: {
    fontSize: 40
  },
  action: {}
})


export default GroupList
*/