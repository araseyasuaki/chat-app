import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import { Text, View, ScrollView } from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList ({messages, currentUser}){
  return (
    <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerStyle={{paddingTop: 10}}>
        {
        messages.map((message, index)=>{
            return(
                <MessageItem message={message} key={index} currentUser={currentUser}/>
            )
        })
    }
    </ScrollView>
  )
}

