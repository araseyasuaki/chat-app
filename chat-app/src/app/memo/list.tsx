import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'

const list = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Header ></Header>
            <View>
                <MemoListItem></MemoListItem>
                <MemoListItem></MemoListItem>
                <MemoListItem></MemoListItem>
            </View>
            <CircleButton>+</CircleButton>
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