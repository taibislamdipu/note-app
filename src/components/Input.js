import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  multiline,
  value,
}) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    // height: 48,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: spacing[5],
  },
});
