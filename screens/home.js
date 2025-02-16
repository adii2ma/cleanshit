import React from 'react';
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';


const Home = ({ navigation }) => {
  const handleCleanRequest = async () => {
    try {
      const response = await axios.post("https://cleanit-backs.onrender.com/api/request", {type: "Cleaning"});
      if (response.data.success) {
        alert("Clean Request Submitted Successfully!");
        navigation.navigate("CleaningScreen");
        
      } else {
        alert(response.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit the clean request");
    }
  };

  const handleMaintenanceRequest = async () => {
    try {
      const response = await axios.post("https://cleanit-backs.onrender.com/api/request", {type: "Maintenance"} );
      if (response.data.success) {
        alert("Maintenance Request Submitted Successfully!");
        
      } else {
        alert(response.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit the maintenance request");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCleanRequest}>
          <LinearGradient
            colors={['#0C1222', '#008A90']}
            style={[styles.button, styles.buttonShadow]}
          >
            <Text style={styles.buttonText}>Clean Request</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleMaintenanceRequest}>
          <LinearGradient
            colors={['#008A90', '#0C1222']}
            style={[styles.button, styles.buttonShadow]}
          >
            <Text style={styles.buttonText}>Maintenance Request</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Ice light blue color
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  button: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    transform: [{ translateY: -3 }],
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});

export default Home;
