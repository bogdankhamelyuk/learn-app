import { auth } from "../firebase.config";
import { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { OAuthCredential } from "firebase/auth";
import { ActivityIndicator, View } from "react-native";

const navigateTo = (navigation, path, params) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        { name: path, params }, // Replace the current state with 'Main' screen
      ],
    })
  );
};

export default function AuthLoadingScreen({ navigation, route }) {
  const [userState, setUserState] = useState({
    user: auth.currentUser,
    isLoading: auth.currentUser === null ? true : false,
  });

  useEffect(() => {
    const onChange = (userExists) => {
      if (userExists) {
        setUserState({ user: userExists.displayName, isLoading: false });
        navigateTo(navigation, "Main", { userName: userExists.displayName });
      } else {
        // User is not authenticated, navigate to sign-in screen
        navigateTo(navigation, "SignIn");
      }
    };
    const onError = (error) => {
      console.log(error);
    };
    const unsubscribe = auth.onAuthStateChanged(onChange, onError);
    return unsubscribe; // You can show a loader here while checking auth status
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userState.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : null}
    </View>
  );
}
