import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from 'react-native';

const SignUp = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roomno, setRoomno] = useState("");
    const [block, setBlock] = useState("");

    const handleSubmit = async () => {
        if (name === '' || email === '' || password === '' || roomno.length > 4 || block.length !== 1) {
            alert("Please ensure all fields meet the required constraints.");
            return;
        }
        await axios.post("http://localhost:8001/api/signup", { name, email, password, roomno, block });
        alert("Sign Up Successful");
    };

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{ ...styles.container, flexGrow: 1 }} // Add flexGrow for scroll
        >
            <View style={{ marginVertical: 100 }}>
                <View style={styles.imageContainer}>
                    <Image source={require("../public/final-image.jpg")} style={styles.imageStyles} />
                </View>
                <Text style={styles.signupText}>SignUp</Text>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#2c3e50' }}>NAME</Text>
                    <TextInput style={styles.signupInput} value={name} onChangeText={text => setName(text)} autoCapitalize="words" autoCorrect={false} />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#2c3e50' }}>EMAIL</Text>
                    <TextInput style={styles.signupInput} value={email} onChangeText={text => setEmail(text)} autoCompleteType="email" keyboardType="email-address" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#2c3e50' }}>PASSWORD</Text>
                    <TextInput style={styles.signupInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} autoComplteType="password" />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#2c3e50' }}>ROOM NUMBER</Text>
                    <TextInput 
                        style={styles.signupInput} 
                        value={roomno} 
                        onChangeText={text => {
                            if (/^\d{0,4}$/.test(text)) setRoomno(text); // Only allow up to 4 digits
                        }} 
                        keyboardType="numeric" // Set to numeric
                    />
                </View>
                <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: '#2c3e50' }}>BLOCK</Text>
                    <TextInput 
                        style={styles.signupInput} 
                        value={block} 
                        onChangeText={text => {
                            if (text.length <= 1) setBlock(text); // Only allow one character
                        }} 
                    />
                </View>
                
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, textAlign: 'center'}}>
                        Already Joined?
                        <Text style={{ color: 'darkred', fontweight: 'bold' }}
                            onPress={()=>navigation.navigate("SignIn")}>Sign In</Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center content horizontally
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center',
    },
    signupInput: {
        borderBottomWidth: 0.5,
        height: 48,
        borderBottomColor: "#8e93a1",
        marginBottom: 10,
    },
    buttonStyle: {
        backgroundColor: "#008b8b",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center', // Center image
        marginBottom: 20,
    },
    imageStyles: {
        width: 150,
        height: 150,
        borderRadius: 15,
    },
});

export default SignUp;
