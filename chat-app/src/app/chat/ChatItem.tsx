import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image'
import { router } from 'expo-router';


interface ChatItemProps {
    item: {
        id:string;
        rooms:{
            roomId: string;
            message: any[]
        }
    }
    router: any;
    index: number;
}



const ChatItem: React.FC<ChatItemProps> = ({ item, router, index }) => {
    const openChatRoom = () =>{
        console.log('item id:', item.id)
        router.push({pathname: '/chat/groupchat', params:{id: item.id}})
    }

    return (
        <View style={styles.chatItemContainer}>
            <TouchableOpacity onPress={openChatRoom} style={styles.chatItemBox}>

                <Image source={item?.profileImage} style={styles.image}/>
                
                
                <View style={styles.chatTitle}>
                    <View style={styles.nameTime}>
                        <Text style={styles.groupName}>{item?.fullName}</Text>
                        <Text style={styles.time}>Time</Text>
                    </View>
                    <Text style={styles.lastMessage}>Hi there!</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    chatItemContainer: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatItemBox: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatTitle: {
        marginLeft: 7,
        flex: 1,
    },
    nameTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    groupName: {
        fontWeight: '800',
    },
    time: {
        alignSelf: 'flex-end', // Changed from 'flex-start' to 'flex-end'
    },
    lastMessage: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    }
});

export default ChatItem;
