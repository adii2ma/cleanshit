import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const SignUp =() => {
    return (
        <View style={styles.container}>
            <Text style={styles.signupText}>SignUp</Text>
            <View style={{ marginHorizontal: 24}}>
                <Text style={{ fontSize: 16, color: '#8e93a1' }}>NAME</Text>
                <TextInput style={styles.signupInput} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    signupText:{
        fontSize: 30,
        textAlign: 'center'
    },
    signupInput:{
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 30,
    }
})

export default SignUp