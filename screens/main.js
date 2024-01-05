import { View, Text, StyleSheet } from "react-native";
import SignOutButton from "../components/signout.button";
import { auth } from "../firebase.config";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function MainScreen({ navigation, route }) {
  const { userName } = route.params || {}; // Access the user parameter from route.params
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  let weatherJson; // to store json response from weather api call

  // are used to be displayed in template code, since useState causes infinite loop inside of useEffect.
  // Therefore you have to have separate vars which value will be copied from stateful variable `location` outside of the useEffect scope
  let lat, lon;

  const API_KEY = "4ff745249fccf1c5743b31ae8c66024a";

  const getWeatherForecastAsync = async () => {
    let geoData = await getLocationAsync();
    setLocation({ lat: geoData.lat, lon: geoData.lon });
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${geoData.lat},${geoData.lon}&units=m`
    );
    weatherJson = await response.json();
    console.log(weatherJson);
  };

  const getLocationAsync = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          reject("Permission denied");
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        resolve({
          lat: userLocation.coords.latitude,
          lon: userLocation.coords.longitude,
        });
      } catch (error) {
        // Handle errors here
        console.error("Error getting location:", error);
        reject(error);
      }
    });
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    getWeatherForecastAsync();
  }, []);

  if (!errorMsg) {
    lat = location.lat;
    lon = location.lon;
  }
  //
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Herzlich Willkommen, {userName} </Text>
      <Text style={styles.locationInfo}>
        Your current location: {location.lat} {location.lon}
      </Text>
      <Text>{weatherJson}</Text>
      <SignOutButton style={styles.signout} onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",

    display: "flex",
    flexDirection: "column",
  },
  locationInfo: {
    position: "relative",
    marginTop: "10%",
    marginLeft: "5%",
  },
  title: {
    position: "relative",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "15%",
    marginLeft: "5%",
  },
  signout: {
    position: "relative",
    marginTop: "100%",
    width: "50%",
    marginLeft: "25%",
  },
});
