// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "./components/Main";  // Correctly importing Main as a named export
import GameDetailScreen from "./components/GameDetailScreen";  // Screen for game details

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen 
            name="Main" 
            component={Main} 
            options={{ headerShown: false }} // Hides the header for Main
          />
          <Stack.Screen 
            name="GameDetail" 
            component={GameDetailScreen} 
            options={{ headerShown: false }} // Hides the header for GameDetail
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",    
    justifyContent: "flex-start", // Cambia a flex-start para alinear en la parte superior
    paddingHorizontal: 12,
  },
});
