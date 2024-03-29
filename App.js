import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Login from "./components/Login";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Login />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71A3D0",
    alignItems: "center",
    justifyContent: "center",
  },
});
