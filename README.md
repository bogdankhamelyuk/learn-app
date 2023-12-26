# React Native App with Google Sign 
In this application I tried to combine React Native with Firebase's authentication service. For that purpose I used `react-native-google-signin/google-signin` library. Unfortunately, 
Expo's native module for Google authentication is getting deprecated and it's no more possible to sign in from it. 

This `readme.md` is good summarization of the steps I used to have in order to start Google Authenticaton. 
## Setting Up
1. Before installing the libraries, consider creating your project inside of the [Google Cloud's Console](https://console.cloud.google.com/). 
2. After that head to [Firebase](https://console.firebase.google.com/) and link project from Google Cloud (it must be shown automatically when you're creating it).
3. Assuming you've got Expo project on your machine, install dependencies by running this command
```
npm i
```
4. Run 

## Installation 
1. Install all dependencies from `package.json`:
   ```
   npm i
   ```
2. Follow instructions of the [React Native Google Sign In](https://react-native-google-signin.github.io/docs/setting-up/expo) installation page. 
