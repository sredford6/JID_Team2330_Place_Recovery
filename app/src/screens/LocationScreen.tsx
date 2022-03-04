import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from '../components/Themed';
import Map from "../components/Map";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

import AndroidOpenSettings from "react-native-android-open-settings";

import React, { useState, useEffect } from "react";

import * as Location from "expo-location";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import { convertTime } from "../components/Helpers";

export default function LocationScreen() {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [address, setAddress] = useState<LocationGeocodedAddress>();
  const [localTime, setLocalTime] = useState<string>();
  const [timestamp, setTimestamp] = useState<number>();
  const [fetching, setFetching] = useState(false);

  const GetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Require location sharing",
        "The app requires to access to your location when you are using the app. Please enable location permission in Settings.",
        [
          { text: "Cancel" },
          {
            text: "Ok",
            onPress: () => {
              Platform.OS === "ios"
                ? Linking.openURL("app-settings:")
                : AndroidOpenSettings.applicationSettings();
            },
          },
        ]
      );
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);
    setLocation(location);
    setAddress(address[0]);
    setTimestamp(location.timestamp);
    setLocalTime(convertTime(new Date(location.timestamp)));
  };

  const FormatInfo = () => {
    let format =
      "Latitude: " +
      location?.coords.latitude +
      ", Longitude: " +
      location?.coords.longitude +
      "\n\nAddress: " +
      JSON.stringify(address) +
      "\n\nLocal time: " +
      localTime;
    return format;
  };

  useEffect(() => {
    GetLocation();
  }, [fetching]);
  // let text = "Waiting..";

  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.container}>
      <Text>{!location ? "Waiting ... No address" : FormatInfo()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setFetching(fetching ? false : true);
        }}
      >
        <Text style={styles.buttonTextWhite}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
  },
});
