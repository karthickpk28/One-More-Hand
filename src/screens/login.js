import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Touchable,
} from "react-native";
import { firebase } from "../../firebase/firebase";
import { AuthContext } from "../provider";
const LoginScreen = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const { email, setEmail } = useContext(AuthContext);
  const register = async () => {
    navigation.navigate("RegisterScreen");
  };

  const login = async () => {
    try {
      let res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      // console.log("user",res.user.email)

      navigation.navigate("HomeScreen", { email });
    } catch (e) {
      alert("Enter Valid Email And password");
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b7d57",
      }}
    >
      <Text style={styles.title}>login</Text>
      <View style={{ width: "60%" }}>
        <TextInput
          style={styles.inputbox}
          value={email}
          placeholder="email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputbox}
          value={password}
          placeholder="password"
          onChangeText={setpassword}
          secureTextEntry
        />

        <View style={styles.Buttonalign}>
          <TouchableOpacity style={styles.Buttons} onPress={login}>
            <Text style={styles.Texts}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Buttons} onPress={register}>
            <Text style={styles.Texts}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginBottom: 10,
    paddingVertical: 0,
    paddingHorizontal: 50,
    borderWidth: 0,
    borderColor: "#20232a",
    borderRadius: 25,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputbox: {
    marginTop: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#61dafb",
    textAlign: "center",
    backgroundColor: "#d1edd8",
  },
  Buttonalign: {
    marginTop: 50,
    flexDirection: "row",
  },
  Buttons: {
    alignItems: "center",
    backgroundColor: "#4999c4",
    padding: 10,
    borderRadius: 15,
    marginLeft: 20,
  },
  Texts: {
    marginTop: 1,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "white",
  },
});
