import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import LogOutButton from '@/src/components/LogOutButton'
import {Feather } from '@expo/vector-icons'


const handlePress = (): void => {
    router.push('memo/profile_set2')
}

const profileset = (): JSX.Element => {
    const navigation = useNavigation()
    useEffect(() => {    
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.profileSetContainer}>
                <Text style={styles.profileSetHead}>個人プロファイル設定</Text>
            </View>
            <CircleButton onPress={handlePress} style={{ top : 'auto', bottom: 20}}>
                <Feather name = 'arrow-right' size={40} color='#ffffff'/>
            </CircleButton>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    profileSetContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1
    },
    profileSetHead: {
        flex:1,
        fontSize: 20,
        textAlignVertical: 'top',
        lineHeight: 24
    }


})

export default profileset