import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import React, { use, useState, useContext } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth.js';

const SignUp = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roomno, setRoomno] = useState("");
    const [block, setBlock] = useState("");
    const [state,setState]=useContext(AuthContext);

    const handleSubmit = async () => {
        if (name === '' || email === '' || password === '' || roomno.length > 4 || block.length !== 1) {
            alert("Please ensure all fields meet the required constraints.");
            return;
        }
        const resp = await axios.post("https://cleanit-backs.onrender.com/api/signup", { name, email, password, roomno, block });
        if(resp.data.error)
            alert(resp.data.error)
        else{
            setState(resp.data);
            await AsyncStorage.setItem("auth-rn",JSON.stringify(resp.data));
            alert("Sign Up Successful");
            navigation.navigate("Home");
        }        
    };

    return (
        // Changed to enableOnAndroid and extraScrollHeight for better scrolling
        <KeyboardAwareScrollView 
            enableOnAndroid
            extraScrollHeight={20}
            contentContainerStyle={styles.scrollViewContent}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require("../public/final-image.jpg")} style={styles.imageStyles} />
                </View>
                <Text style={styles.signupText}>Sign Up</Text>
                {/* Added a wrapper for input fields for consistent spacing */}
                <View style={styles.inputWrapper}>
                    <InputField label="NAME" value={name} onChangeText={setName} autoCapitalize="words" autoCorrect={false} />
                    <InputField label="EMAIL" value={email} onChangeText={setEmail} autoCompleteType="email" keyboardType="email-address" />
                    <InputField label="PASSWORD" value={password} onChangeText={setPassword} secureTextEntry={true} autoComplteType="password" />
                    <InputField 
                        label="ROOM NUMBER" 
                        value={roomno} 
                        onChangeText={(text) => {
                            if (/^\d{0,4}$/.test(text)) setRoomno(text);
                        }}
                        keyboardType="numeric"
                    />
                    <InputField 
                        label="BLOCK" 
                        value={block} 
                        onChangeText={(text) => {
                            if (text.length <= 1) setBlock(text);
                        }}
                    />
                </View>
                
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.signInText}>
                    Already Joined?{' '}
                    <Text style={styles.signInLink} onPress={() => navigation.navigate("SignIn")}>
                        Sign In
                    </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

// Created a reusable component for input fields
const InputField = ({ label, ...props }) => (
    <View style={styles.inputField}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.signupInput} {...props} />
    </View>
);

const styles = StyleSheet.create({
    // Added scrollViewContent style for better scrolling
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40, // Added vertical padding
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageStyles: {
        width: 150,
        height: 150,
        borderRadius: 75, // Changed to full circle
    },
    signupText: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20, // Added margin
        fontWeight: 'bold', // Made text bold
    },
    // Added inputWrapper for consistent spacing
    inputWrapper: {
        width: '100%',
        paddingHorizontal: 24,
    },
    // Added inputField style
    inputField: {
        marginBottom: 15,
    },
    // Changed input label style
    inputLabel: {
        fontSize: 14,
        color: '#2c3e50',
        marginBottom: 5,
    },
    signupInput: {
        borderBottomWidth: 1, // Increased border width
        height: 48,
        borderBottomColor: "#8e93a1",
    },
    buttonStyle: {
        backgroundColor: "#008b8b",
        height: 50,
        marginVertical: 20, // Changed to vertical margin
        justifyContent: "center",
        width: '90%', // Set width relative to screen
        borderRadius: 25, // Increased border radius
    },
    buttonText: {
        fontSize: 18, // Slightly reduced font size
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    // Added styles for sign in text and link
    signInText: {
        fontSize: 14,
        textAlign: 'center',
    },
    signInLink: {
        color: 'darkred',
        fontWeight: 'bold',
    },
});

export default SignUp;