import { Redirect, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react'
import { Text, View, FlatList } from "react-native";
import { collection, onSnapshot, query} from 'firebase/firestore'
import { db, auth } from '../../config'
import { type Memo } from '../../types/memos'
import GroupListItem from "@/src/components/GroupListItem";

const GroupList = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([])
  useEffect(()=> {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    const q = query(ref)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = []
      snapshot.forEach((doc)=> {
        console.log('memo', doc.data())
        const { bodyText } = doc.data()
        remoteMemos.push({
          id: doc.id,
          bodyText
        })
      })
      setMemos(remoteMemos)
    })
    return unsubscribe
  }, [])

  return (
    <View>
      <FlatList
      data={memos}
      renderItem={({ item })=>  <GroupListItem memo={item} /> }
      />
    </View>
  )
}

export default GroupList