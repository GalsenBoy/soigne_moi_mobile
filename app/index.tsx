import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { routes } from "../routes";

// import { AsyncStorage } from "react-native";

export default function Login() {
  const [matricule, setMatricule] = useState("");
  const [error, setError] = useState("");

  const medecinLogin = async () => {
    try {
      const response = await fetch(`${routes}auth/signin/medecin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricule: matricule }),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      await AsyncStorage.setItem("accessToken", data.access_token);
      console.log("====================================");
      console.log(data.access_token);
      console.log("====================================");
      router.push("/profile/MedecinProfile");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Matricule"
        onChangeText={(text) => setMatricule(text)}
      />
      <Button title="SE CONNECTER" onPress={medecinLogin} />
      {/* <Button title="SE CONNECTER" onPress={medecinLogin} /> */}
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71A3D0",
    alignItems: "center",
    justifyContent: "center",
  },
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
    // borderColor: "white",
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  linkToProfile: {
    color: "white",
    fontSize: 16,
    marginTop: 12,
  },
});
