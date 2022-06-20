import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function RadioInput({ option, noteColor, setNoteColor }) {
  const selected = option === noteColor;
  return (
    <Pressable
      onPress={() => setNoteColor(option)}
      key={option}
      style={styles.radioContainer}
    >
      <View
        style={[styles.outerCircle, selected && styles.selectedOuterCircle]}
      >
        <View
          style={[styles.innerCircle, selected && styles.selectedInnerCircle]}
        />
      </View>
      <Text style={styles.radioText}>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
