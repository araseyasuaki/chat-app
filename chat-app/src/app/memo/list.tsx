import { View, Text, StyleSheet } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import LogOutButton from '@/src/components/LogOutButton'
import { Feather } from '@expo/vector-icons'

const list = (): JSX.Element => {
    const navigation = useNavigation()
    useEffect(() => {    
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    },[])
    return (
        <View style={styles.container}>
            <View>
                <MemoListItem/>
                <MemoListItem/>
                <MemoListItem/>
            </View>
            <CircleButton>
                <Feather name = 'plus' size={40}/>
            </CircleButton>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})

export default list