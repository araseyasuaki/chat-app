import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { type Memo } from '../types/memos'
import { FontAwesome, Feather } from '@expo/vector-icons'

interface Props {
    memo: Memo
}

const GroupListItem = (props: Props): JSX.Element => {
    const { memo } = props
    const { bodyText } = memo
    if(bodyText === null) {return null}
    return(
        <Link href='/memo/detail' asChild>
            <TouchableOpacity style={styles.groupListItem}>
                <View>
                    <Text numberofLines={1} style={styles.groupListItemTitle}>{bodyText}</Text>
                    <Text style={styles.groupListItemDate}>2023/10/1</Text>
                </View>
                <TouchableOpacity>
                    <Feather name='x' />
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}


const styles = StyleSheet.create({
    groupListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)'
    },
    groupListItemTitle: {
        fontSize: 16,
        lineHeight: 32
    },
    groupListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484'
    }
})

export default GroupListItem