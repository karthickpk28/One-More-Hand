import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/login";
import RegisterScreen from "./src/screens/register";

import postScreen from "./src/screens/posts";
import Provider from "./src/provider";
import {
  SettingsScreen,
  HomeScreen,
  HomeScreens,
  DetailsScreen,
  HistoryScreen,
  HistoryofworkScreen,
} from "./src/screens/home";
const Stack = createStackNavigator();
export const Route = () => (
  <NavigationContainer>
    <Provider>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          options={{ headerShown: false }}
          name={"LoginScreen"}
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={"RegisterScreen"}
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={"HomeScreen"}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={"postScreen"}
          component={postScreen}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen
          name="HistoryofworkScreen"
          component={HistoryofworkScreen}
        />
      </Stack.Navigator>
    </Provider>
  </NavigationContainer>
);
export default function App() {
  return <Route></Route>;
}
