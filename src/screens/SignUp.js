import React from "react";
import { View, StyleSheet, Text, Platform, Alert } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/actions/auth";
import { useSelector } from "react-redux";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../helpers/validations";
import * as types from "../redux/actions/types";

export default function SignUp({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validUsername, setValidUsername] = React.useState(true);
  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [InvalidCredentials, setCredentials] = React.useState(true);

  const serverError = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  const signupHandler = () => {
    if (InvalidCredentials) {
      handleValidUsername(username);
      handleValidEmail(email);
      handleValidPassword(password);
      return;
    } else if (serverError) {
      dispatch({ type: types.DISMISS_AUTH_ERRORERROR });
      return Alert.alert("User with Email already exist", "Please try again", [
        { text: "Okay" },
      ]);
    } else {
      dispatch(signUp(username, email, password, navigation));
    }
  };

  const handleValidUsername = (value) => {
    const errorMessage = usernameValidation(value);
    handleUserInput(errorMessage, setValidUsername);
  };

  const handleValidEmail = (value) => {
    const errorMessage = emailValidation(value);
    handleUserInput(errorMessage, setValidEmail);
  };

  const handleValidPassword = (value) => {
    const errorMessage = passwordValidation(value);
    handleUserInput(errorMessage, setValidPassword);
  };

  const handleUserInput = (errorMessage, setState) => {
    if (errorMessage !== null) {
      setState(false);
    } else {
      setState(true);
      setCredentials(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Username</Text>
        <View>
          <Input
            testID="username"
            isValid={validUsername}
            validationFn={usernameValidation(username)}
            placeholder="Your Username"
            type="username"
            onChangeText={(username) => {
              setUsername(username);
            }}
            value={username}
            autoCapitalize="none"
            style={styles.textInput}
            onBlur={() => handleValidUsername(username)}
          />
        </View>

        <Text style={styles.text_footer}>Email</Text>
        <View>
          <Input
            testID="email"
            isValid={validEmail}
            validationFn={emailValidation(email)}
            placeholder="Your Email"
            type="email"
            onChangeText={(email) => setEmail(email)}
            value={email}
            autoCapitalize="none"
            keyboardType={"email-address"}
            style={styles.textInput}
            onBlur={() => handleValidEmail(email)}
          />
        </View>

        <Text style={styles.text_footer}>Password</Text>
        <View>
          <Input
            testID="password"
            isValid={validPassword}
            validationFn={passwordValidation(password)}
            placeholder="Your Password"
            type="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            value={password}
            style={styles.textInput}
            onBlur={() => handleValidPassword(password)}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Sign Up"
            onPress={signupHandler}
            color="#fff"
            size={20}
            style={[
              styles.button,
              { width: "100%", backgroundColor: "#00A6FB" },
            ]}
          />
          <Button
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
            color="#fff"
            size={20}
            color="#00A6FB"
            style={[
              styles.button,
              {
                width: "100%",
                backgroundColor: "#fff",
                borderColor: "#00A6FB",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
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
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 2 : 2.7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginTop: Platform.OS === "ios" ? 0 : -8,
    paddingLeft: 7,
    color: "#053751",
  },
  buttonWrapper: {
    alignItems: "center",
    marginTop: 50,
    paddingLeft: 10,
    color: "#05375a",
    width: "100%",
  },
  textSign: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
});
