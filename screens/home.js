import { StyleSheet, Text, SafeAreaView } from 'react-native';

import React from 'react';

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainText}>Home</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "space-between" },
    mainText: { fontSize: 30, textAlign: 'center' } // Corrected 'textAllign' to 'textAlign'
});

export default Home;
