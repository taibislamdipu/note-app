import { View, Text, Button } from "react-native";
import React from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { colors } from "../theme/colors";

// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Home() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, height: "100%" }}>
      <View>
        <Text>Home</Text>
        <Button
          onPress={logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
}
