import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { AsyncStorage } from "react-native";

export default function Login() {
  const [matricule, setMatricule] = useState("");

  const medecinLogin = async () => {
    try {
      const response = await fetch(
        "https://cbc0-2001-861-6680-24b0-a827-38c5-e5fb-a5f7.ngrok-free.app/auth/signin/medecin",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matricule: matricule }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      await AsyncStorage.setItem("accessToken", data.access_token);
      console.log("====================================");
      console.log(data.access_token);
      console.log("====================================");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.loginTitle}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Matricule"
        onChangeText={(text) => setMatricule(text)}
      />
      <Button title="SE CONNECTER" onPress={medecinLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "white",
    marginTop: 12,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    marginBottom: 12,
    width: 200,
    borderRadius: 12,
    fontSize: 16,
    borderColor: "white",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
});
