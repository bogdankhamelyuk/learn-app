import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "../components/signout.button";
import { CommonActions } from "@react-navigation/native";

export default function MainScreen({ route }) {
  const { userName } = route.params || {}; // Access the user parameter from route.params

  return (
    <View style={styles.container}>
      <Text>Herzlich Willkommen, {userName}</Text>
      {/* onPress => navigate to authloading and transer username set to null k */}
      <SignOutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
