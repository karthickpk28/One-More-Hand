import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { Card } from "react-native-elements";
import firebase from "firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../provider";
import { CardStyleInterpolators } from "@react-navigation/stack";
const db = firebase.firestore();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreens({ navigation }) {
  const { email } = useContext(AuthContext);
  const [data, setData] = useState([]);
  console.log(email);
  const getData = async () => {
    const a = await db.collection("Posts").get();
    let d = [];

    a.forEach((e, val) => {
      let f = e.data();
      if (f.email != email) {
        console.log(f.email, e.id);
        d.push({ ...f, id: e.id });
      }
    });
    setData(d);
  };
  useEffect(() => {
    getData();
  }, []);

  const setAccepted = (id) => {
    setData((e) => {
      let f = [...e];
      console.log("cosooll", id);
      for (const s of f) {
        if (s.id == id) {
          s.Accepted = true;
          s.WorkerEmail = email;
          let alt = s;
          delete alt.id;
          db.collection("Posts").doc(id).set(alt);
        }
      }
      return f;
    });
  };

  const Bruh = data.map((i) => (
    <>
      {console.log(i)}
      {!i?.Accepted ? (
        <Card>
          <Card.Title>{i.TypeOfWork}</Card.Title>

          <Card.Divider />
          <Text>Help seaker : {i.name}</Text>
          <Text>wage/Hour : {i.Wage}</Text>
          <Text>Contact : {i.email}</Text>
          <Text>Address : {i.Address}</Text>
          <Card.Divider />
          <Text>
            ON :{i.Date} / From {i.FromTime}- {i.ToTime}
          </Text>
          <Button
            title="ACCEPT"
            onPress={() => {
              setAccepted(i.id);
            }}
          />
        </Card>
      ) : (
        <></>
      )}
    </>
  ));
  const image = { uri: require("../image/background.jpg") };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../image/background.jpg")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <View style={{}}>
            <Text style={{ justifyContent: "center", alignContent: "center" }}>
              OMH
            </Text>
            {Bruh}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

function SettingsScreen({ navigation }) {
  const { email } = useContext(AuthContext);
  const [Wage, setWage] = useState("");
  const [TypeOfWork, setTypeOfWork] = useState("");
  const [Address, setAddress] = useState("");
  const [Date, setDate] = useState("");
  const [FromTime, setFromTime] = useState("");
  const [ToTime, setToTime] = useState("");

  const pushData = async () => {
    await db
      .collection("Posts/")
      .add({
        email: email,
        Address: Address,
        TypeOfWork: TypeOfWork,
        Wage: Wage,
        Date: Date,
        FromTime: FromTime,
        ToTime: ToTime,
        Completed: false,
        Accepted: false,
        WorkerEmail: "",
      })
      .then(() => {
        navigation.navigate("HistoryScreen");
      });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
        }}
      >
        Request A Hand
      </Text>
      <View style={{ width: "60%" }}>
        {/* <TextInput
          style={styles.inputbox}
          value={email}
          placeholder="email"
          onChangeText={setEmail}
        /> */}

        <TextInput
          style={styles.inputbox}
          value={Address}
          placeholder="Address"
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.inputbox}
          value={TypeOfWork}
          placeholder="TypeOfWork"
          onChangeText={setTypeOfWork}
        />
        <TextInput
          style={styles.inputbox}
          value={Wage}
          placeholder="Wage"
          onChangeText={setWage}
        />
        <TextInput
          style={styles.inputbox}
          value={Date}
          placeholder="Date"
          onChangeText={setDate}
        />
        <TextInput
          style={styles.inputbox}
          value={FromTime}
          placeholder="FromTime"
          onChangeText={setFromTime}
        />
        <TextInput
          style={styles.inputbox}
          value={ToTime}
          placeholder="ToTime"
          onChangeText={setToTime}
        />
        <TouchableOpacity style={styles.Buttons} onPress={pushData}>
          <Text style={styles.Texts}>Request</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 10,
          color: "#01111a",
        }}
      >
        History Of Your Post
      </Text>

      <TouchableOpacity
        style={styles.Buttons}
        onPress={() => navigation.navigate("HistoryScreen")}
      >
        <Text style={styles.Texts}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

function HistoryScreen() {
  const { email } = useContext(AuthContext);
  const [data, setData] = useState([]);
  console.log(email);
  const getData = async () => {
    const a = await db.collection("Posts").get();
    let d = [];

    a.forEach((e, val) => {
      let f = e.data();
      if (f.email == email) {
        console.log(f.email, e.id);
        d.push({ ...f, id: e.id });
      }
    });
    setData(d);
  };
  useEffect(() => {
    getData();
  }, []);

  const setCompleted = (id) => {
    setData((e) => {
      let f = [...e];

      for (const s of f) {
        if (s.id == id) {
          s.Completed = true;
          s.Accepted = true;
          let alt = s;
          delete alt.id;
          db.collection("Posts").doc(id).set(alt);
        }
      }
      return f;
    });
  };

  const _History = data.map((i) => (
    <>
      <Card>
        <Card.Title>{i.TypeOfWork}</Card.Title>

        <Card.Divider />

        <Text>
          <Text style={{ color: "#2a6270" }}>wage/Hour : </Text>
          {i.Wage}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>ADDRESS : </Text> {i.Address}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>ACCEPTED BY : </Text>{" "}
          {i.WorkerEmail}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>DATE : </Text> {i.Date}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>TIME : </Text> {i.FromTime}
        </Text>
        <Card.Divider />
        <View>
          {i.Completed ? (
            <Text>Work Done</Text>
          ) : (
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => {
                setCompleted(i.id);
              }}
            >
              <Text style={styles.Texts}>COMPLETED / CANCEL</Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </>
  ));

  return (
    <SafeAreaView>
      <ScrollView>
        <View>{_History}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryofworkScreen() {
  const { email } = useContext(AuthContext);
  const [data, setData] = useState([]);
  console.log(email);
  const getData = async () => {
    const a = await db.collection("Posts").get();
    let d = [];

    a.forEach((e, val) => {
      let f = e.data();
      if (f.WorkerEmail == email) {
        console.log(f.email, e.id);
        d.push({ ...f, id: e.id });
      }
    });
    setData(d);
  };
  useEffect(() => {
    getData();
  }, []);

  const setCompleted = (id) => {
    setData((e) => {
      let f = [...e];

      for (const s of f) {
        if (s.id == id) {
          s.Completed = true;
          let alt = s;
          delete alt.id;
          db.collection("Posts").doc(id).set(alt);
        }
      }
      return f;
    });
  };

  const _History = data.map((i) => (
    <>
      <Card>
        <Card.Title>{i.TypeOfWork}</Card.Title>

        <Card.Divider />

        <Text>
          <Text style={{ color: "#2a6270" }}>wage/Hour : </Text>
          {i.Wage}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>ADDRESS : </Text> {i.Address}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>ACCEPTED BY : </Text>{" "}
          {i.WorkerEmail}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>DATE : </Text> {i.Date}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>TIME : </Text> {i.FromTime}
        </Text>
      </Card>
    </>
  ));

  return (
    <SafeAreaView>
      <ScrollView>
        <View>{_History}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileScreen({ navigation }) {
  const { email, setemail } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    const a = await db.collection("Users").get();
    let d = [];

    a.forEach((e, val) => {
      let f = e.data();
      if (f.UserEmail == email) {
        d.push({ ...f, id: e.id });
      }
    });
    setData(d);
  };
  useEffect(() => {
    getData();
  }, []);
  const Profile = data.map((i) => (
    <>
      <Card>
        <Card.Title>{i.UserName}</Card.Title>

        <Card.Divider />

        <Text>
          <Text style={{ color: "#2a6270" }}>Aadar No : </Text>
          {i.Aadarno}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>ADDRESS : </Text> {i.UserAddress}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>AGE : </Text> {i.Age}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>GENGER : </Text> {i.Gender}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>EMAIL : </Text> {i.UserEmail}
        </Text>
        <Text>
          <Text style={{ color: "#2a6270" }}>OCCUPATION : </Text> {i.Occupation}
        </Text>
      </Card>
    </>
  ));

  const Logout = () => {
    // setemail(" ");
    navigation.push("LoginScreen");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>{Profile}</View>
        <TouchableOpacity
          style={styles.Buttons}
          onPress={() => navigation.navigate("HistoryofworkScreen")}
        >
          <Text style={styles.Texts}>Works Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Buttons} onPress={Logout}>
          <Text style={styles.Texts}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="JOBS FEED"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="dynamic-feed" size={24} color="#fff" />
          ),
        }}
        component={HomeScreens}
      />
      <Tab.Screen
        name="POST JOB"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="post-add" size={24} color="#fff" />
          ),
        }}
        component={SettingsScreen}
      />
      <Tab.Screen
        name="ACCOUNT"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="account-box" size={24} color="#fff" />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
export {
  HomeScreen,
  SettingsScreen,
  HomeScreens,
  DetailsScreen,
  ProfileScreen,
  HistoryScreen,
  HistoryofworkScreen,
};

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
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#4999c4",
    padding: 10,
    borderRadius: 15,
  },
  Texts: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#01111a",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
});
