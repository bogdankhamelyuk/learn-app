import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { database } from "../firebase.config";
import { ref, set } from "firebase/database";
import TouchButton from "../components/touch.button";
import { auth } from "../firebase.config";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import TextPrompt from "../components/text.prompt";

export default function MainScreen({ navigation, route }) {
  const { userName } = route.params || {}; // Access the user parameter from route.params
  const userId = userName.replace(/\s/g, "");
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherImg, setWeatherImg] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [disabledButton, setButtonStatus] = useState(true);
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

  const writeUserData = (cityName) => {
    console.log(location.city);
    set(ref(database, "users/" + userId), {
      userName: userName,
      city1: location.city,
      city2: "",
      city3: "",
    });
  };
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
    setWeatherImg(weatherJson.current.weather_icons[0]);
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
    writeUserData();
  }, []);

  if (!errorMsg) {
    lat = location.lat;
    lon = location.lon;
    city = location.city;
    temperature = weather.temperature;
    description = weather.description;
  }

  const handleCityChange = (city) => {
    setButtonStatus(!city.length > 0);
    setInputCity(city);
  };

  const searchCity = async () => {
    //
    Keyboard.dismiss();
    let weatherJson = await getWeather(inputCity);
    if (weatherJson.current) {
      setWeather({
        temperature: weatherJson.current.temperature,
        description: weatherJson.current.weather_descriptions,
      });
      setLocation({
        lat: weatherJson.location.lat,
        lon: weatherJson.location.lon,
        city: weatherJson.location.name,
      });
      setWeatherImg(weatherJson.current.weather_icons[0]);
      handleCityChange(""); // clean input
    } else {
      Alert.alert("No data available", "Cannot find weather forecast", [
        {
          text: "Done",
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, {userName} </Text>
        {/* <Text style={styles.textInfo}>Your current city: {city}</Text>
        <Text style={styles.textInfo}>
          Your current weather: {temperature} °C, {description}
        </Text> */}

        <View style={styles.weatherContainer}>
          <Image
            source={{ uri: weatherImg ? weatherImg : null }}
            style={{ width: 80, height: 80 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.textInfo}>{city}</Text>
            <Text style={styles.textInfo}>
              {temperature} °C, {description}
            </Text>
          </View>
        </View>
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
    // flexDirection: "column",
  },
  weatherContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "5%",
  },
  textInfo: {
    // position: "relative",
    marginTop: "5%",
    marginLeft: "5%",
    fontSize: 20,
  },
  title: {
    position: "relative",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "20%",
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
