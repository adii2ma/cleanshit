import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (email === '' || password === '') {
            alert("All fields are required");
            return;
        }
        const resp = await axios.post("https://cleanit-backs.onrender.com/api/signin", {email, password });
        console.log(resp.data);
        
        alert("Sign In Successful");
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
                <Text style={styles.signInText}>Sign In</Text>
                {/* Added a wrapper for input fields for consistent spacing */}
                <View style={styles.inputWrapper}>
                    <InputField label="EMAIL" value={email} onChangeText={setEmail} autoCompleteType="email" keyboardType="email-address" />
                    <InputField label="PASSWORD" value={password} onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                
                <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.signUpText}>
                    Not yet registered?{' '}
                    <Text style={styles.signUpLink} onPress={() => navigation.navigate("SignUp")}>
                        Sign Up
                    </Text>
                </Text>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

// Created a reusable component for input fields
const InputField = ({ label, ...props }) => (
    <View style={styles.inputField}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.signInInput} {...props} />
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
    signInText: {
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
        color: '#8e93a1',
        marginBottom: 5,
    },
    signInInput: {
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
    // Added styles for sign up text and link
    signUpText: {
        fontSize: 14,
        textAlign: 'center',
    },
    signUpLink: {
        color: 'darkred',
        fontWeight: 'bold',
    },
    // Added style for forgot password text
    forgotPasswordText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: '#8e93a1',
    },
});

export default SignIn;