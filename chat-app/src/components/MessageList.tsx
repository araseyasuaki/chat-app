import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { Text, View, ScrollView } from "react-native";
import MessageItem from "./MessageItem";

// Define the types for the props
interface Message {
  userId: string;
  text: string;
  profileImage: string;
  senderName: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: {
  userId: string;
  };
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >

      {messages.map((messages, index) => (
         //console.log('Profile Image:', message.profileImage);
        <MessageItem message={messages} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
