import React, { useState } from "react";

import {
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Touchable,
} from "react-native";
// import { TouchableOpacity } from 'react-native-gesture-handler';

import { firebase } from "../../firebase/firebase";
const db = firebase.firestore();

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [UserName, setUserName] = useState("");
  const [Address, setAddress] = useState("");
  const [Gender, setGender] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Age, setAge] = useState("");
  const [Aadarno, setAadarno] = useState("");

  const pushData = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await db.collection("Users/").add({
          UserId: 33,
          UserName: UserName,
          UserEmail: email,
          UserPassword: password,
          UserAddress: Address,
          Gender: Gender,
          Occupation: Occupation,
          Age: Age,
          Aadarno: Aadarno,
        });
        console.log("helo");
      });
  };

  const register = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert("registratio success");
    } catch (e) {
      alert(e);
    }
  };

  const login = async () => {
    navigation.navigate("LoginScreen");
    //     try{
    //     await firebase.auth().signInWithEmailAndPassword(email,password)
    //     // navigation.navigate('Home')
    //     alert("login success")
    //   }
    //   catch(e){
    //     alert(e)
    //   }
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
      <Text style={styles.title}>Register</Text>
      <View style={{ width: "60%" }}>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            color: "white",
            marginBottom: 100,
          }}
        >
          Enter User Details
        </Text>
        <TextInput
          style={styles.inputbox}
          value={UserName}
          placeholder="UserName"
          onChangeText={setUserName}
        />
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
        <TextInput
          style={styles.inputbox}
          value={ConfirmPassword}
          placeholder="confirmPassword"
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.inputbox}
          value={Address}
          placeholder="Address"
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.inputbox}
          value={Age}
          placeholder="Age"
          onChangeText={setAge}
        />
        <TextInput
          style={styles.inputbox}
          value={Gender}
          placeholder="Gender"
          onChangeText={setGender}
        />
        <TextInput
          style={styles.inputbox}
          value={Occupation}
          placeholder="Occupation"
          onChangeText={setOccupation}
        />
        <TextInput
          style={styles.inputbox}
          value={Aadarno}
          placeholder="Aadarno"
          onChangeText={setAadarno}
        />
        <View style={styles.Buttonalign}>
          <TouchableOpacity style={styles.Buttons} onPress={pushData}>
            <Text style={styles.Texts}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Buttons} onPress={login}>
            <Text style={styles.Texts}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default RegisterScreen;

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
