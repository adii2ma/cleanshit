import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const CleaningScreen = () => {
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatus = async () => {
    try {
        const response = await axios.get(`https://cleanit-backs.onrender.com/api/status?t=${Date.now()}`, {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Expires: "0",
            },
            withCredentials: true,
        });

        if (response.data.success) {
            setStatusList([response.data.cleaningRequest]); // Store it as an array for FlatList
        } else {
            setStatusList([]); // Empty list if no request exists
        }
    } catch (error) {
        console.error("Error fetching status:", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cleaning Requests</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={statusList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Room No: {item.roomno}</Text>
              <Text style={styles.text}>Email: {item.email}</Text>
              <Text style={[styles.status, item.status === "completed" ? styles.completed : styles.pending]}>
                Status: {item.status}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 8, borderRadius: 8, shadowColor: "#000", elevation: 3 },
  text: { fontSize: 16, color: "#333" },
  status: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  completed: { color: "green" },
  pending: { color: "red" },
});

export default CleaningScreen;
