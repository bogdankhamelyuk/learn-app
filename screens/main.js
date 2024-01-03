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
      <Text style={styles.title}>Herzlich Willkommen, {userName} </Text>
      <SignOutButton style={styles.signout} onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  title: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 30,
    top: 0,
    left: 0,
    marginTop: "15%",
    marginLeft: "5%",
  },
  signout: {
    position: "absolute",
    bottom: 0,
    marginBottom: 30,
  },
});
