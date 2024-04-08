import React, { useCallback, useState } from "react";
import {
  Platform,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  View,
  StatusBar,
} from "react-native";
import SearchInput from "./components/SearchInput";
import getImagesforWeather from "./utils/getImagesforWeather";
import { fetchLocationId, fetchWeather } from "./utils/Api";

const App = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [temperature, setTemparture] = useState(0);
  const [weatherDescription, setWeatherDescription] = useState("");

  const fetchWeatherDetailes = useCallback(
    async (city) => {
      try {
        // setLoading(true);
        // setError(false);
        // setTemparture(0);
        // setWeatherDescription("");
        const woeid = await fetchLocationId(city);

        console.log(woeid);

        if (!woeid) return;

        const { location, weather, temperature } = await fetchWeather(woeid);

        if (location && weather && temperature) {
          setLocation(location);
          setWeatherDescription(weather);
          setTemparture(temperature);
        } else {
          setError(true);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    },
    [location]
  );

  const onSubmitEditing = async (text) => {
    if (!text) return;
    await fetchWeatherDetailes(text);
    setLocation(text);

    console.log(`Searching for ${location}`);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={getImagesforWeather("Clear")}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>
            {weatherDescription}
          </Text>
          <Text style={[styles.largeText, styles.textStyle]}>
            {temperature}
          </Text>

          <SearchInput
            onSubmitEditing={onSubmitEditing}
            style={styles.textInput}
            value={location}
            placeholder={"Seach any city..."}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },

  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 20,
  },

  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "AvenirNext-Regular",
    //   },
    //   android: {
    //     fontFamily: "Roboto",
    //   },
    // }),
  },

  imageContainer: {
    flex: 1,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },

  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
