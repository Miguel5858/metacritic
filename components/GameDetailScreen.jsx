import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GameDetailScreen = ({ route }) => {
  const { game } = route.params; // Obtiene el juego desde los parámetros

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <Text style={styles.score}>Score: {game.score}</Text>
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.description}>{game.description}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // Light background for the SafeAreaView
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Dark background for the entire container
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 20, // Optional: adds space at the bottom of the content
    paddingTop: 20, // Add top padding to create space from the status bar
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff", // Keep title text color white for contrast
  },
  score: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: "green",
  },
  description: {
    fontSize: 16,
    color: "#94a3b8", // Keep description text color for contrast
  },
});

export default GameDetailScreen;
