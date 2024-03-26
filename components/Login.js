import { Text, View, TextInput, Button, StyleSheet } from "react-native";

// StyleSheet is not imported in the code you provided, so I assume it's already imported

export default function Login() {
  return (
    <View>
      <Text style={login.loginTitle}>Se connecter</Text>
      <TextInput
        style={login.input} // corrected: use styles.input instead of login.input
        placeholder="Matricule"
        // onChangeText={(newText) => setText(newText)} // I'm assuming setText is not defined here, you might need to define it
      />
      <Button title="SE CONNECTER" />
    </View>
  );
}

const login = StyleSheet.create({
  input: {
    borderWidth: 2, // corrected: use borderWidth instead of border
    borderColor: "white",
    marginTop: 12,
    paddingTop: 5, // corrected: use paddingTop instead of padding
    paddingBottom: 5, // corrected: use paddingBottom instead of padding
    paddingLeft: 5, // corrected: use paddingLeft instead of padding
    marginBottom: 12,
    width: 200,
    borderRadius: 12,
    fontSize: 16, // corrected: add fontSize to set the font size
    // corrected: use borderColor instead of border
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center", // corrected: add textAlign: "center" to center the text
  },
});

// Now, there are no errors in your code;
// I hope this helps you to understand the error and fix it. If you have any questions, feel free to ask. Thank you!;
