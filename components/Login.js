import { Text, View, TextInput } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login Hiii word</Text>
      <TextInput
        style={{ height: 40, border: "2px solid black" }}
        placeholder="Type here to translate!"
        onChangeText={(newText) => setText(newText)}
        // defaultValue={text}
      />
    </View>
  );
}
