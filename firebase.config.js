import { initializeApp } from "firebase/app";
/* In Firebase, getAuth is a function provided by the Firebase Auth SDK that allows you to get an instance of the Auth service
This instance enables you to perform various authentication-related operations in your application */
import { getAuth,initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBMLFHisExbNUV2puLxpdCTDBCHhNgqLHE",
  authDomain: "my-learning-app-409018.firebaseapp.com",
  projectId: "my-learning-app-409018",
  storageBucket: "my-learning-app-409018.appspot.com",
  messagingSenderId: "861961987029",
  appId: "1:861961987029:web:1bc1c666dd60924663135c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // or 'session' as per your requirement
  AsyncStorage, // Pass AsyncStorage here
});