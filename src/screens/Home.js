import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Logo from "../components/Logo";
import Button from "../components/Button";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo source={require("../assets/news_logo.png")}/>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Stay connected with Todays News</Text>
        <Text style={styles.text}>Sign In to explore</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate("SignIn")}
            name="navigate-next"
            color="#fff"
            size={20}
            color="#fff"
            style={[styles.button, { width: 150, backgroundColor: "#00A6FB" }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A6FB",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  text: {
    color: "#05375a",
    marginTop: 5,
  },
  buttonWrapper: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
});
