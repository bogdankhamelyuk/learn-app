import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TouchButton from "../components/touch.button";
import { auth } from "../firebase.config";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import TextPrompt from "../components/text.prompt";

export default function MainScreen({ navigation, route }) {
  const { userName } = route.params || {}; // Access the user parameter from route.params
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    city: null,
  });

  const [weather, setWeather] = useState({
    temperature: null,
    description: null,
  });

  // are used to be displayed in template code, since useState causes infinite loop inside of useEffect.
  // Therefore you have to have separate vars which value will be copied from stateful variable `location` outside of the useEffect scope
  let city, temperature, description;

  const API_KEY = "4ff745249fccf1c5743b31ae8c66024a";

  const getWeatherForecastAsync = async () => {
    let geoData = await getLocationAsync();
    setLocation({
      lat: geoData.lat,
      lon: geoData.lon,
      city: geoData.city,
    });

    let weatherJson = await getWeather(geoData.lat, geoData.lon);

    setWeather({
      temperature: weatherJson.current.temperature,
      description: weatherJson.current.weather_descriptions,
    });
  };

  const getWeather = async (geoData) => {
    const response = await fetch(
      `http://api.weatherstack.com/forecast?access_key=${API_KEY}&query=${geoData}&units=m&hourly=1&interval=1`
    );
    return await response.json();
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
        let { latitude, longitude } = userLocation.coords;
        let cityObj = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        let cityName = cityObj[0].city;
        resolve({
          lat: latitude,
          lon: longitude,
          city: cityName,
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
    city = location.city;
    temperature = weather.temperature;
    description = weather.description;
  }
  const [inputCity, setInputCity] = useState("");
  const [disabledButton, setButtonStatus] = useState(true);

  const handleCityChange = (city) => {
    setButtonStatus(!city.length > 0);
    setInputCity(city);
  };

  const searchCity = async () => {
    handleCityChange(""); // clean input
    Keyboard.dismiss();
    console.log(inputCity);
    let weatherJson = await getWeather(inputCity);
    console.log(weatherJson);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, {userName} </Text>
        <Text style={styles.locationInfo}>Your current city: {city}</Text>
        <Text style={styles.locationInfo}>
          Your current weather: {temperature} °C, {description}
        </Text>
        <View style={styles.citySearchBar}>
          <TextPrompt
            value={inputCity}
            onChangeText={handleCityChange}
            placeholder="Enter city"
            style={styles.input}
          />
          <TouchButton
            style={styles.searchButton}
            text={"Search"}
            onPress={searchCity}
            disabled={disabledButton}
          />
        </View>
        <TouchButton
          style={styles.signoutButton}
          onPress={handleSignOut}
          text={"Sign Out"}
        />
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: "5%",
    marginLeft: "5%",
  },
  title: {
    position: "relative",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "15%",
    marginLeft: "5%",
  },
  signoutButton: {
    position: "relative",
    marginTop: "100%",
    width: "50%",
    marginLeft: "25%",
  },
  searchButton: {
    width: 100,
    marginLeft: "5%",
  },
  input: {
    marginLeft: "5%",
    borderColor: "#80848a",

    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 40,
    paddingLeft: 10,
  },
  citySearchBar: {
    marginTop: "5%",
    flexDirection: "row",
  },
});
