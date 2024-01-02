import { View, StyleSheet, Text } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase.config";
import { CommonActions } from "@react-navigation/native";

GoogleSignin.configure({
  webClientId:
    "861961987029-9t1iqcni2k35us4eah353t1s086jh9qe.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  iosClientId:
    "861961987029-2hsmc543en22iktlu4hp3iaasl0o3gpv.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default function SignInScreen({ navigation }) {
  const navigateToMain = (params) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Main",
            params,
          }, // Replace the current state with 'Main' screen
        ],
      })
    );
  };

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, user } = await GoogleSignin.signIn(); // extract id token from signin
      const googleCredentials = GoogleAuthProvider.credential(idToken); //create credentials from token
      console.log(user);
      await signInWithCredential(auth, googleCredentials);
      let userName = user.givenName + " " + user.familyName;
      navigateToMain({ userName: userName });
    } catch (error) {
      console.log(`error: ${error}`);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome to the Learn App</Text>
        <GoogleSigninButton
          color={GoogleSigninButton.Color.Dark}
          size={GoogleSigninButton.Size.Wide}
          onPress={signIn}
        />
      </View>
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
