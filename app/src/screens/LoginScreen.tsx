import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"; //Xingpeng: I think we should add dependency of this import into json file.

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome Back! </Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
          Sign in to continue
        </Text>
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 2,
            paddingBottom: 20,
          }}
          placeholder="                   Username                      "
          // onChangeText={(text) => {
          //   this.setState({ errMsg: "" }), this.setState({ username: text });
          // }} // this one pop the error.
        />
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 2,
            paddingBottom: 20,
          }}
          placeholder="                   Password                      "
          secureTextEntry={true}
          // onChangeText={(text) => {
          //   this.setState({ errMsg: "" }), this.setState({ password: text });
          // }} 
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            // onPress={() => this.onLogin()}
            style={{
              width: 200,
              backgroundColor: "#0d47a1",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 40,
              marginTop: 30,
            }}
          >
            <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
              Login Now
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 20 }}>Forgot Password ?</Text>

        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <Text style={{ color: "gray" }}>Don't have an account?</Text>
          <Text style={{ fontWeight: "bold" }}> Sign Up</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
