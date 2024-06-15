import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'

/*
const handlePress = (): void => {
    router.push('memo/edit')
}
*/

const Detail = (): JSX.Element => {
    return(
        <View style={styles.container}>
            <Header />
            <View>
                <Text>Hi!</Text>
                <Text>Nice day!</Text>
            </View>
            <View>
                <ScrollView>               
                    <Text>
                    Login Success
                    </Text>
                </ScrollView>
            </View>
            <CircleButton>+</CircleButton>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        backgroundColor: '#467FD3',
        height: 104,
        justifyContent: 'flex-end'
    }
})


export default Detail