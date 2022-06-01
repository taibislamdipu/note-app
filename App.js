import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
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

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDP_XHHLQNg_18yRw5AgDd48-Sze8qrLDM",
  authDomain: "note-app-native.firebaseapp.com",
  projectId: "note-app-native",
  storageBucket: "note-app-native.appspot.com",
  messagingSenderId: "129430970588",
  appId: "1:129430970588:web:ca900f9e5e3ab05c6f9419",
};

const app = initializeApp(firebaseConfig);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  const user = false;

  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return <Text>Font is loading...</Text>;
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Create" component={Create} />
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
