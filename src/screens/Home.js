import { View, Text } from "react-native";
import React from "react";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { colors } from "../theme/colors";
export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: colors.white, height: "100%" }}>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}
