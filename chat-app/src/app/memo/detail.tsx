import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'

const Detail = (): JSX.Element => {
    return(
        <View style={styles.container}>
            <Header />
            <View>
                <Text>Shopping List</Text>
                <Text>2023/10/01</Text>
            </View>
            <View>
                <ScrollView>               
                    <Text>
                        Vlad~~
                        baka
                        hellow
                        moscow
                        jajajaj
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