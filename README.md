# React Native learn project

## About

This is my React Native (RN) learn project. Here I am working on different aspects: user authentication, window navigation, async programming, Fetch API, Geocoding API, Weather API and so on.

In this `readme.md` is a rough summarization of the main steps I used to have in order to be able to use Google Authenticaton. Later on, the documentation will be extented, regarding not only Authentication proccess, but also Weather API and UI solutions.

## User Authentication using Firebase

### Preparation

1. Before installing the libraries, consider creating your project inside of the [Google Cloud's Console](https://console.cloud.google.com/).
2. After that head to [Firebase](https://console.firebase.google.com/) and link the newly created project from Google Cloud (it must be shown automatically underneath).
3. Inside of the Firebase Console select Authentication, choose Google and save.

### Setting Up

In the previous steps you've prepared your backend, now it's time to bind it with the frontend. Since you're (assumed) developing app for IOS and Android it's important to prebuild our Expo project for those platforms.

1. Prebuild the project by running
   ```
   npx expo prebuild
   ```
   If you've got MacOs on your machine, then this command will create two folders: `ios` and `android` with native code in them.
2. (optional if you're on MacOS) Go to Firebase and create IOS application. Paste bundle Id from `app.json` `"bundleIdentifier"`'s value inside of the `"ios"` field. Skip other for now.
3. Go to Firebase and create Android application. Fill the packet name from `app.json` `"package"`'s value of `"android"` field.
4. Now you have to provide SHA-1 certificate's fingerprint. To do that do the following steps:

   ```
   eas credentials
   ```

   Choose Android -> production -> Keystore -> Set Up new Keystore, hit Enter and you will see desired `SHA1 Fingerprint`. Copy that value and exit Keystore Manager by pressing `Ctrl-C`.
   Put the copied value into the SHA-1 Fingerprint. Skip everything other for now.

5. Save everything

You can check your project in Google Console -> Credentials -> OAuth 2.0 Client IDs and see that there're some new fields appeared. Those are generated automatically by Firebase, since at the beginning you'be already linked Google Cloud's project with the Firebase.

### Installation

Now you can install the most important library of this project. Following steps are based on the installation guide from [React Native Google Sign In](https://react-native-google-signin.github.io/docs/setting-up/expo) page. Let's repeat them here as well:

1. Ironically, but I had problems with the last version of the library (@11 due to Dec. 2023). The problem was, when it was building project for IOS using CocoaPads and this kind of error was always shown:

   ```
   CocoaPods could not find compatible versions for pod "ExpoAdapterGoogleSignIn":
     In Podfile:
   ```

   Thanks to [Stackoverlow](https://stackoverflow.com/a/74917149/14350322) the problem was solved, but I used version 9.0.2 because it's most close one to the proposed 8th and has big amount of downloads.

   ```
   npx expo install @react-native-google-signin/google-signin@9.0.2
   ```

2. Add plugin somewhere into `app.json`, but inside of the `"expo"` field:
   ```
   "plugins": ["@react-native-google-signin/google-signin"]
   ```
3. Return to the Firebase. Open IOS and Android applications and download `google-services.json` from Android and `GoogleService-Info.plist` from IOS app (if possible).
4. Copy the downloaded config files into project's root, i.e. at the same level, where `app.json` is.

5. Add to the `"android"` field of the `app.json`:
   ```
   "googleServicesFile" : "./google-services.json"
   ```
6. (Optional) If you're on MacOS, add to the `"ios"` field:
   ```
   "googleServicesFile": "./GoogleService-Info.plist"
   ```
7. Generate native dependencies by running:

   ```
   npx expo prebuild --clean
   ```

   This will install the library natively for each of the platforms and copy config files into their folders.

8. Rebuild your app:
   ```
   npx expo run:android && npx expo run:ios
   ```
   Now you're ready to develop. For the code implementation you can check [screens/welcome.js](https://github.com/bogdankhamelyuk/learn-app/blob/main/screens/welcome.js)

### Notes

Please also note, that each time you quit IDE or something else, you have to start the project not by calling `npx expo`, but by rebuilding dependencies once again. by calling command from 9. step of Installation.

It's also required to rebuild the app, when installing new libraries.
