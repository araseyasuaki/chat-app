import { JSX } from 'react'
import { View, Text, StyleSheet, type TextStyle } from 'react-native'

// define props's property

interface Props {
    children: string // it is must be
    bang?: boolean  // bang is the optional
    style?: TextStyle
}

const Hellow = (props: Props): JSX.Element  => {
    const { children, bang, style } = props
    return (
        <View>
            <Text style={[styles.text, style]}>
                Hellow {children}{bang === true ? '!' : ''}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#ffffff',
        backgroundColor: 'blue',
        fontSize: 40,
        fontWeight: 'bold',
        padding: 16,
    }
})

export default Hellow
