import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export default function Button({ title, onPress, customStyles }) {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellow,
    width: 165,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
  },
});
