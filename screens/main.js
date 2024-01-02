import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "../components/signout.button";
import { auth } from "../firebase.config";

export default function MainScreen({ navigation, route }) {
  const { userName } = route.params || {}; // Access the user parameter from route.params

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Auth"); // Pass userName as null on sign-out
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out error
    }
  };
  return (
    <View style={styles.container}>
      <Text>Herzlich Willkommen, {userName} </Text>
      <SignOutButton onPress={handleSignOut} />
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
