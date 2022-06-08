import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { typography } from "./src/theme/typography";
import Text from "./src/components/Text/Text";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import FlashMessage from "react-native-flash-message";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./src/firebase";

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   signOut(auth);
  // });

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return authSubscription;
  }, []);

  const myFonts = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create" options={{ headerShown: false }}>
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name="Edit" component={Edit} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage
        position="top"
        duration={2500}
        hideOnPress={true}
        statusBarHeight={50}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
