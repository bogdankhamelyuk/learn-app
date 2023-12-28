import { auth } from "../firebase.config";
import { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';

export default function AuthLoadingScreen({ navigation }){
    //2do: 
    // * useState for setting user
    // * signOut
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe(); // Unsubscribe to avoid memory leaks
  
        // Check if user is authenticated
        if (user) {
          // User is authenticated, navigate to main screen
            console.log("user exists already")
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    { name: 'Main' }, // Replace the current state with 'Main' screen
                    ],
                })
            )   
        } else {
          // User is not authenticated, navigate to sign-in screen
          navigation.navigate('SignIn');
        }
      });
    }, [navigation]);
    return null; // You can show a loader here while checking auth status
};