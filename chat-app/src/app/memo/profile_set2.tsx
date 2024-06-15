import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import { Link, router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import LogOutButton from '../../components/LogOutButton'
import {Feather } from '@expo/vector-icons'

const profileset2 = (): JSX.Element => {
    const navigation = useNavigation()
    useEffect(() => {    
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.profileSetContainer}>
                <Text style={styles.profileSetHead}>個人プロファイル設定2</Text>
            </View>
            <View style={styles.CategoryContainer}>
                <Link href='/memo/user' asChild>
                    <TouchableOpacity>
                        <Text> ユーザー </Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/memo/creater' asChild>
                    <TouchableOpacity>
                        <Text> クリエーター </Text>
                    </TouchableOpacity>
                </Link>
            </View>
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
    },
    CategoryContainer: {
        flex:1,
        fontSize: 15,
        paddingVertical: 2,
        paddingHorizontal: 2
    },
    profileCategoryBody: {
        flex:1,
        fontSize: 20,
        textAlignVertical: 'top',
        lineHeight: 24
    }
})

export default profileset2